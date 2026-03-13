import ErrorMessage from "@/components/ErrorMessage"
import type { ProjectFormData } from "@/types"
import type { FieldErrors, UseFormRegister } from "react-hook-form"

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>
  errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({ register, errors }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <div className="flex justify-between items-center">
          <label htmlFor="projectName" className="text-sm uppercase font-bold">
            Nombre del Proyecto
          </label>
          {errors.projectName && (
            <ErrorMessage>{errors.projectName.message}</ErrorMessage>
          )}
        </div>
        <input
          id="projectName"
          className="w-full p-3 border border-gray-300 rounded-xl"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("projectName", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />
      </div>

      <div className="mb-5 space-y-3">
        <div className="flex justify-between items-center">
          <label htmlFor="clientName" className="text-sm uppercase font-bold">
            Nombre Cliente
          </label>
          {errors.clientName && (
            <ErrorMessage>{errors.clientName.message}</ErrorMessage>
          )}
        </div>
        
        <input
          id="clientName"
          className="w-full p-3 border border-gray-300 rounded-xl"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />
      </div>

      <div className="mb-5 space-y-3">
        <div className="flex justify-between items-center">
          <label htmlFor="description" className="text-sm uppercase font-bold">
            Descripción
          </label>
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
        <textarea
          id="description"
          className="w-full p-3 border border-gray-300 rounded-xl"
          placeholder="Descripción del Proyecto"
          {...register("description", {
            required: "Una descripción del proyecto es obligatoria",
          })}
        />
      </div>
    </>
  )
}