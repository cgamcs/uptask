import { Link, useNavigate, useParams } from 'react-router-dom'

function ProjectTeamView() {
  const navigate = useNavigate()
  const paramas = useParams()
  const projectId = paramas.projectId!

  return (
    <>
      <h1 className="text-4xl font-bold">Administrar Equipo</h1>
      <p className="text-xl text-gray-500 font-light mt-5">
        Administrar el equipo de trabajo para este proyecto
      </p>

      <nav className="my-5 flex gap-5">
        <button
          type="button"
          className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white cursor-pointer text-xl font-bold transition-colors"
          onClick={() => navigate(location.pathname + '?addMember=true')}
        >
          Agregar Colaboradores
        </button>

        <Link
          className="bg-gray-400 hover:bg-gray-500 px-10 py-3 text-white cursor-pointer text-xl font-bold transition-colors"
          to={`/projects/${projectId}`}
        >
          Volver a Proyecto
        </Link>
      </nav>
    </>
  )
}

export default ProjectTeamView