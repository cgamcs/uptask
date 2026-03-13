import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import type { ForgotPasswordForm } from "@/types"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "@/api/AuthAPI"
import { toast } from "sonner"

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })
  
  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


  return (
    <>
      <h1 className="text-5xl font-black text-gray-100">Reestablecer Contraseña</h1>
      <p className="text-2xl font-light text-gray-100 mt-5">
        ¿Olvidaste tu contraseña? Coloca tu email {''}
        <span className=" text-fuchsia-500 font-bold"> y resive instrucciones</span>
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 mt-10 bg-white rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label
              className="font-normal text-2xl"
              htmlFor="email"
            >Email</label>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border rounded-xl"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
        </div>

        <input
          type="submit"
          value='Enviar Instrucciones'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black active:scale-95 transition-all ease-linear text-xl cursor-pointer rounded-xl"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-gray-200 hover:text-fuchsia-400 transition-colors 150ms"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          to='/auth/register'
          className="text-center text-gray-200 hover:text-fuchsia-400 transition-colors 150ms"
        >
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}