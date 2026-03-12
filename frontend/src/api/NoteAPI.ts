import { type NoteFormData, type Project, type Task } from "@/types"
import { isAxiosError } from "axios"
import api from "@/lib/axios"

type NoteAPIType = {
  formData: NoteFormData
  projectId: Project['_id']
  taskId: Task['_id']
}

export async function createNote({projectId, taskId, formData} : Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`
    const { data } = await api.post(url, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}