import type { ConfirmToken, NewPasswordForm } from "@/types"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { updatePasswordWithToken } from "@/api/AuthAPI"
import { toast } from "sonner"

type NewPasswordFormProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordForm({token} : NewPasswordFormProps) {
  const navigate = useNavigate()
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  }
  const { register,handleSubmit, watch, reset, formState: { errors }, } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/auth/login')
    }
  })

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token
    }

    mutate(data)
  }

  const password = watch("password")

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10 bg-white mt-10 rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label className="font-normal text-2xl">Password</label>
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
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label className="font-normal text-2xl">Repetir Password</label>
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border rounded-xl"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />
        </div>

        <input
          type="submit"
          value="Establecer Password"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black active:scale-[0.97] transition-all ease-linear text-xl cursor-pointer rounded-xl"
        />
      </form>
    </>
  )
}
