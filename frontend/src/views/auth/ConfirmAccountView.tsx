import { Link } from "react-router-dom"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react"
import type { ConfirmToken } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { confirmAccount } from "@/api/AuthAPI"
import { toast } from "sonner"

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token)
  }

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleComplete = (token: ConfirmToken['token']) => mutate({token})

  return (
    <>
      <h1 className="text-5xl font-black text-gray-100">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-gray-100 mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10 rounded-2xl"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center items-center gap-3">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <div className="flex rounded-xl border-gray-300 border overflow-hidden">
              <PinInputField className="w-10 h-10 p-3 bg-white placeholder:text-white outline-0" />
              <PinInputField className="w-10 h-10 p-3 bg-white placeholder:text-white outline-0" />
              <PinInputField className="w-10 h-10 p-3 bg-white placeholder:text-white outline-0" />
            </div>
            <span className="bg-black h-1 w-5 block rounded-full"></span>
            <div className="flex rounded-xl border-gray-300 border overflow-hidden">
              <PinInputField className="w-10 h-10 p-3 bg-white placeholder:text-white outline-0" />
              <PinInputField className="w-10 h-10 p-3 bg-white placeholder:text-white outline-0" />
              <PinInputField className="w-10 h-10 p-3 bg-white placeholder:text-white outline-0" />
            </div>
          </PinInput>
        </div>

      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/request-code'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  )
}