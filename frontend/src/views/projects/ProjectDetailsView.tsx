import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import Spinner from "@/components/Spinner"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"

function ProjectDetailsView() {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isError, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })
  
  const canEdit = useMemo(()=> data?.manager === user?._id, [data, user])
  
  if (isError) return <Navigate to='/404' />
  if (isLoading && authLoading) return <Spinner />

  if (data && user) return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">{data.projectName}</h1>
          <p className="text-xl text-gray-500 font-light mt-5">
            {data.description}
          </p>
        </div>

        <div>
          {isManager(data.manager, user._id) && (
            <nav className="flex gap-5">
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white cursor-pointer text-xl font-bold transition-colors rounded-xl"
                onClick={() => navigate("?newTask=true")}
              >
                Agregar Tarea
              </button>

              <Link
                className="bg-[#141414] hover:bg-[#141414]/80 px-10 py-3 text-white cursor-pointer text-xl font-bold transition-colors rounded-xl"
                to={'team'}
              >
                Colaboradores
              </Link>
            </nav>
          )}
        </div>
      </div>

      <TaskList tasks={data.tasks} canEdit={canEdit} />

      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}

export default ProjectDetailsView