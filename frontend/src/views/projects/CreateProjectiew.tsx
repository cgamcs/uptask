import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import ProjectForm from "@/components/ProjectForm"
import type { ProjectFormData } from "@/types"
import { createProject } from "@/api/ProjectAPI"

function CreateProjectiew() {
  const navigate = useNavigate()
  const initialValues : ProjectFormData = {
    projectName: '',
    clientName: '',
    description: ''
  }
  const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

  const handleForm = async (data : ProjectFormData) => {
    await createProject(data)
    navigate('/')
  }


  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

        <nav className="mt-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/'
          >Volver a Proyectos</Link>
        </nav>

        <form 
          action=""
          className="mt-10 bg-white p-10 shadow-lg rounded-lg"
          onSubmit={handleSubmit(handleForm)}
        >
          <ProjectForm
            register={register}
            errors={errors}
          />

          <input 
            type="submit"
            value="Crear Proyecto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}

export default CreateProjectiew