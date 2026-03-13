import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import type { UpdateCurrentUserPasswordForm } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { updateCurrentUserPassword } from "@/api/AuthAPI"
import { toast } from "sonner"

export default function ChangePasswordView() {
  const initialValues : UpdateCurrentUserPasswordForm = {
    current_password: "",
    password: "",
    password_confirmation: "",
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: updateCurrentUserPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const password = watch("password")
  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Utiliza este formulario para cambiar tu password
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-2xl border-gray-100 border"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <div className="flex justify-between items-center">
              <label
                className="text-sm uppercase font-bold"
                htmlFor="current_password"
              >
                Password Actual
              </label>
              {errors.current_password && (
                <ErrorMessage>{errors.current_password.message}</ErrorMessage>
              )}
            </div>
            <input
              id="current_password"
              type="password"
              placeholder="Password Actual"
              className="w-full p-3  border border-gray-300 rounded-xl"
              {...register("current_password", {
                required: "El password actual es obligatorio",
              })}
            />
          </div>

          <div className="mb-5 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm uppercase font-bold" htmlFor="password">
                Nuevo Password
              </label>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full p-3  border border-gray-300 rounded-xl"
              {...register("password", {
                required: "El Nuevo Password es obligatorio",
                minLength: {
                  value: 8,
                  message: "El Password debe ser mínimo de 8 caracteres",
                },
              })}
            />
          </div>
          <div className="mb-5 space-y-3">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password_confirmation"
                className="text-sm uppercase font-bold"
              >
                Repetir Password
              </label>
              {errors.password_confirmation && (
                <ErrorMessage>
                  {errors.password_confirmation.message}
                </ErrorMessage>
              )}
            </div>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3  border border-gray-300 rounded-xl"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === password || "Los Passwords no son iguales",
              })}
            />
          </div>

          <input
            type="submit"
            value="Cambiar Password"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors active:scale-[0.97] rounded-xl"
          />
        </form>
      </div>
    </>
  )
}