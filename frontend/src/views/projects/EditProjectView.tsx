import { useParams } from "react-router-dom"

function EditProjectView() {
  const params = useParams()
  const projectId = params.projectId!

  console.log(projectId)

  return (
    <div>EditProjectView</div>
  )
}

export default EditProjectView