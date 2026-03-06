import { useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"

function ProjectDetailsView() {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  if (isError) return <Navigate to='/404' />
  if (isLoading) return <span className="loader"></span>
  if (data) return (
    <>
      <h1 className="text-4xl font-bold">{data.projectName}</h1>
      <p className="text-xl text-gray-500 font-light mt-5">{data.description}</p>

      <nav className="my-5 flex gap-">
        <button
          type="button"
          className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white cursor-pointer text-xl font-bold transition-colors"
          onClick={() => navigate('?newTask=true')}
        >
          Agregar Tarea
        </button>
      </nav>

      <AddTaskModal />
    </>
  )
}

export default ProjectDetailsView