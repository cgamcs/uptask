import { removeNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "sonner"

type NoteDetailProps = {
  note: Note
}

function NoteDetail({note}: NoteDetailProps) {
  const params = useParams()
  const location = useLocation()

  const projectId = params.projectId!
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!

  const { data, isLoading } = useAuth()
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: removeNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })

  if (isLoading) return <span className="w-full text-center h-fit">Cargando...</span>

  return (
   <div className="p-3 flex gap-5 justify-between items-center">
    <div>
      <p><span className="font-bold">{note.createdBy.name}:</span> {note.content}</p>
      <p className="text-gray-500 mt-2">{formatDate(note.createdAt)}</p>
    </div>

    {canDelete && (
      <button
        type="button"
        className="text-red-500 hover:text-red-600 cursor-pointer active:scale-95 transition-all ease-linear"
        onClick={() => mutate({projectId, taskId, noteId: note._id})}
      >
        Eliminar
      </button>
    )}
   </div>
  )
}

export default NoteDetail