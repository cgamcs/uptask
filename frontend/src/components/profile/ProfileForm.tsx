import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type { User, UserProfileForm } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "@/api/AuthAPI"
import { toast } from "sonner"

type ProfileFormProps = {
  data: User
}


export default function ProfileForm({ data } : ProfileFormProps) {
  const { register, handleSubmit, formState: { errors }, } = useForm<UserProfileForm>({ defaultValues: data })

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-5xl font-black ">Mi Perfil</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Aquí puedes actualizar tu información
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-2xl border-gray-100 border"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm uppercase font-bold" htmlFor="name">
                Nombre
              </label>
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full p-3  border border-gray-300 rounded-xl"
              {...register("name", {
                required: "Nombre de usuario es obligatoro",
              })}
            />
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              E-mail
            </label>
            <input
              id="text"
              type="email"
              placeholder="Tu Email"
              className="w-full p-3  border border-gray-300 rounded-xl"
              {...register("email", {
                required: "EL e-mail es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors rounded-xl active:scale-[0.97]"
          />
        </form>
      </div>
    </>
  )
}