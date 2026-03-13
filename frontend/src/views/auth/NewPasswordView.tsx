import { useState } from "react"
import NewPasswordToken from "./NewPasswordToken"
import NewPasswordForm from "./NewPasswordForm"
import type { ConfirmToken } from "@/types"

function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>('')
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
      <h1 className="text-5xl font-black text-gray-100">Reestablecer Contraseña</h1>
      <p className="text-2xl font-light text-gray-100 mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>

      {!isValidToken ? (
        <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  )
}

export default NewPasswordView