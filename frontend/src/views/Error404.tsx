import { Link } from 'react-router-dom'

function Error404() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col text-center">
        <h1 className='text-3xl mb-5'>404 - Página No Encontrada</h1>
        <p>La página que estás buscando no existe.</p>
        <Link to="/" className="text-purple-500 hover:text-purple-700 underline">
          Volver a la página principal
        </Link>
      </div>
    </div>
  )
}

export default Error404