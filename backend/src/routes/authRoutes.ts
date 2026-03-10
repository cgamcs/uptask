import { Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { body, param } from "express-validator"
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

router.post('/confirm-account',
  body('token').notEmpty().withMessage('EL token no puede ir vacio'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post('/login',
  body('email').isEmail().withMessage('Email no valido'),
  body('password').notEmpty().withMessage('La contraseña no puede ir vacia'),
  handleInputErrors,
  AuthController.login
)

router.post('/request-code',
  body('email').isEmail().withMessage('Email no valido'),
  handleInputErrors,
  AuthController.requestConfirmationCode
)

router.post('/forgot-password',
  body('email').isEmail().withMessage('Email no valido'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post('/validate-token',
  body('token').notEmpty().withMessage('El token no puede ir vacio'),
  handleInputErrors,
  AuthController.validateToken
)

router.post('/update-password/:token',
  param('token').isNumeric().withMessage('Token no valido'),
  body('password').isLength({min: 16}).withMessage('La contraseña es muy corta, minimo 16 caracteres'),
  body('password_confirmation').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas son diferentes')
    }
    return true
  }),
  handleInputErrors,
  AuthController.updatePasswordWithToken
)

export default router