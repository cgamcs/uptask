import api from '@/lib/axios'
import { isAxiosError } from 'axios'
import type { ConfirmToken, UserRegistrationForm } from '@/types'

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/create-account`
    const { data } = await api.post<string>(url, formData)
    return data
    
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/confirm-account`
    console.log(url)
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}