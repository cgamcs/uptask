import { Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { body } from "express-validator"
import { handleInputErrors } from "../middleware/validation"

const router = Router()

router.post('/create-account',
  body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
  body('password').isLength({min: 16}).withMessage('La contraseña es muy corta, minimo 16 caracteres'),
  body('password_confirmation').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas son diferentes')
    }
    return true
  }),
  body('email').isEmail().withMessage('Email no valido'),
  handleInputErrors,
  AuthController.createAccount
)

export default router