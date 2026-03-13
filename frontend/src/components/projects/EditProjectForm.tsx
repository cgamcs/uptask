import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import type { ProjectFormData } from "@/types"
import ProjectForm from "./ProjectForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/api/ProjectAPI"
import { toast } from "sonner"

type EditProjectFormProps = {
  data: ProjectFormData
  projectId: string
}

function EditProjectForm({data, projectId}: EditProjectFormProps) {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description
  }})

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['projects']})
      queryClient.invalidateQueries({queryKey: ["editProject", projectId]})
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData : ProjectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Editar Proyecto</h1>
            <p className="text-xl font-light text-gray-500 mt-5">
              Llena el siguiente formulario para editar un proyecto
            </p>
          </div>

          <nav>
            <Link
              className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-xl"
              to="/"
            >
              Volver a Proyectos
            </Link>
          </nav>
        </div>


        <form
          action=""
          className="mt-10 bg-white p-10 shadow-lg rounded-2xl border-gray-100 border"
          onSubmit={handleSubmit(handleForm)}
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold active:scale-[0.97] transition-all ease-linear cursor-pointer rounded-xl"
          />
        </form>
      </div>
    </>
  )
}

export default EditProjectForm