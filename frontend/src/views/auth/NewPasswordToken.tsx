import { validateToken } from "@/api/AuthAPI"
import type { ConfirmToken } from "@/types"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useMutation } from "@tanstack/react-query"
import { type Dispatch } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

type NewPasswordTokenProps = {
  token: ConfirmToken['token']
  setToken: Dispatch<React.SetStateAction<string>>
  setIsValidToken: Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token)
  }

  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      setIsValidToken(true)
    },
  })

  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token })

  return (
    <>
      <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
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
          to="/auth/forgot-password"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  )
}