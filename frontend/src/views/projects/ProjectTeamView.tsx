import { Fragment } from "react"
import { EllipsisVerticalIcon } from "lucide-react"
import { Menu, Transition } from "@headlessui/react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import AddMemberModal from "@/components/team/AddMembermodal"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI"
import Spinner from "@/components/Spinner"
import { toast } from "sonner"

function ProjectTeamView() {
  const navigate = useNavigate()
  const paramas = useParams()
  const projectId = paramas.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] })
    }
  })

  if (isLoading) return <Spinner />

  if (isError) return <Navigate to={"/404"} />

  if (data)
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
            onClick={() => navigate(location.pathname + "?addMember=true")}
          >
            Agregar Colaboradores
          </button>

          <Link
            className="bg-gray-500 hover:bg-gray-400 px-10 py-3 text-white cursor-pointer text-xl font-bold transition-colors"
            to={`/projects/${projectId}`}
          >
            Volver a Proyecto
          </Link>
        </nav>

        <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data?.map((member) => (
              <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-gray-600">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() => mutate({projectId, userId: member._id})}
                          >
                            Eliminar del Proyecto
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">No hay miembros en este equipo</p>
        )}

        <AddMemberModal />
      </>
    )
}

export default ProjectTeamView