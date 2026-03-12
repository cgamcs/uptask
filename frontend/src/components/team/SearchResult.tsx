import { addUserToProject } from "@/api/TeamAPI"
import type { TeamMember } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

type SearchResultProps = {
  user: TeamMember
  reset: () => void
}

function SearchResult({user, reset}: SearchResultProps) {
  const params = useParams()
  const projectId = params.projectId!

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id
    }
    mutate(data)
  }

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 px-5 py-3">
        <p>{user.name}</p>
        <button
          type="button"
          className="text-purple-600 hover:text-purple-500 font-bold cursor-pointer active:scale-95 transition-transform ease-linear"
          onClick={handleAddUserToProject}
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  )
}

export default SearchResult