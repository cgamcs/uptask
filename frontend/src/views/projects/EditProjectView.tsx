import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"

function EditProjectView() {
  const params = useParams()
  const projectId = params.projectId!
  const { data, isError, isLoading } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  if (isError) return <Navigate to='/404' />
  if (isLoading) return <span className="loader"></span>
  if (data) return <EditProjectForm data={data} projectId={projectId} />
}

export default EditProjectView