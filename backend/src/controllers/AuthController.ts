import type { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import Token from "../models/Token"
import { generateToken } from "../utils/token"
import { transporter } from "../config/nodemailer"
import { AuthEmail } from "../emails/AuthEmail"

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body

      // Prevenir duplicados
      const userExists = await User.findOne({email})
      if(userExists) {
        const error = new Error('El usuario ya esta registrado')
        return res.status(409).json({ error: error.message })
      }

      // Crea un usuario
      const user = new User(req.body)

      // Hashear la contraseña
      user.password = await hashPassword(password)

      // Generar token
      const token = new Token()
      token.token = generateToken()
      token.user = user._id

      // Enviar email
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token
      })

      await Promise.allSettled([user.save(), token.save()])
      res.send('Cuenta creada, revisa tu email para confirmarla')
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body

      const tokenExists = await Token.findOne({token})

      if(!tokenExists) {
        const error = new Error('Token no valido')
        return res.status(404).json({ error: error.message })
      }

      const user = await User.findById(tokenExists.user)
      user.confirmed = true

      await Promise.allSettled([ user.save(), tokenExists.deleteOne() ])
      res.send('Cuenta confirmada!')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      
      const user = await User.findOne({email})
      if(!user) {
        const error = new Error('Email incorrecto')
        return res.status(404).json({ error: error.message })
      }

      if(!user.confirmed) {
        const token = new Token()
        token.user = user._id
        token.token = generateToken()
        await token.save()

        // Enviar email
        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token
        })

        const error = new Error('La cuenta no ha sido confirmada, revise su email se enviara un nuevo token ')
        return res.status(401).json({ error: error.message })
      }

      // Revisar contraseña
      const isPasswordCorrect = await checkPassword(password, user.password)
      if(!isPasswordCorrect) {
        const error = new Error('Contraseña incorrecta')
        return res.status(404).json({ error: error.message })
      }

      res.send('Autenticado')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      
      const user = await User.findOne({email})
      if(!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ error: error.message })
      }

      if(user.confirmed) {
        const error = new Error('El usuario ya esta confirmado')
        return res.status(403).json({ error: error.message })
      }

      // Generar token
      const token = new Token()
      token.token = generateToken()
      token.user = user._id

      // Enviar email
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token
      })

      await Promise.allSettled([user.save(), token.save()])
      res.send('Se envio un nuevo token')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      
      const user = await User.findOne({email})
      if(!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ error: error.message })
      }

      // Generar token
      const token = new Token()
      token.token = generateToken()
      token.user = user._id
      await token.save()

      // Enviar email
      AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token
      })
      
      res.send('Revisa tu email para instrucciones')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body

      const tokenExists = await Token.findOne({token})

      if(!tokenExists) {
        const error = new Error('Token no valido')
        return res.status(404).json({ error: error.message })
      }

      res.send('Token valido')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static updatePasswordWithToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.params

      const tokenExists = await Token.findOne({token})

      if(!tokenExists) {
        const error = new Error('Token no valido')
        return res.status(404).json({ error: error.message })
      }

      const user = await User.findById(tokenExists.user)
      user.password = await hashPassword(req.body.password)

      await Promise.allSettled([ tokenExists.deleteOne(), user.save() ])

      res.send('Contraseña actualizada!')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }
}