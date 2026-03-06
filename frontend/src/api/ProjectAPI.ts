import api from "@/lib/axios"
import type { ProjectFormData } from "@/types"
import { isAxiosError } from "axios"

export async function createProject(formData : ProjectFormData) {
  console.log(formData)
  try {
    const { data } = await api.post('/projects', formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}