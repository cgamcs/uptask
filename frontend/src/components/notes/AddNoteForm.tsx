import type { NoteFormData } from "@/types"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "sonner"
import { useLocation, useParams } from "react-router-dom"

function AddNoteForm() {
  const params = useParams()
  const location = useLocation()
  
  const queryParams = new URLSearchParams(location.search)
  
  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const initialValue : NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValue})

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data)
      reset()
    }
  })

  const handleAddNote = (formData: NoteFormData) => {
    const data = {
      projectId,
      taskId,
      formData
    }
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="content">Crear Nota</label>
        <input
          type="text"
          id="content"
          className="w-full p-3 border border-gray-300"
          {...register('content', {
            required: 'El contenido de la nota es obligatorio'
          })}
        />
        {errors.content && (
         <ErrorMessage>{errors.content.message}</ErrorMessage> 
        )}
      </div>

      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 uppercase font-black w-full p-2 text-white cursor-pointer"
      />
    </form>
  )
}

export default AddNoteForm