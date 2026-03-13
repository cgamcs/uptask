import { useForm } from "react-hook-form"
import type { UserLoginForm } from "@/types/index"
import ErrorMessage from "@/components/ErrorMessage"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { authenticateUser } from "@/api/AuthAPI"
import { toast } from "sonner"

export default function LoginView() {
  const navigate = useNavigate()

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="text-3xl font-black text-gray-100">Iniciar Sesión</h1>
      <p className="text-xl font-light text-gray-100 mt-5">
        Comienza a planear tus proyectos {''}
        <span className=" text-fuchsia-500 font-bold"> iniciando sesión en este formulario</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label
              className="font-normal text-2xl"
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
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label
              className="font-normal text-2xl"
            >Password</label>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border rounded-xl"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black active:scale-[0.97] transition-all ease-linear text-xl cursor-pointer rounded-xl"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          className="text-center text-gray-200 hover:text-fuchsia-400 transition-colors ease-linear 150ms"
          to='/auth/register'
        >¿No tienes cuenta? Crear una</Link>

        <Link
          to='/auth/forgot-password'
          className="text-center text-gray-200 hover:text-fuchsia-400 transition-colors ease-linear 150ms"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </>
  )
}