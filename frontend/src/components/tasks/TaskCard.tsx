import { useNavigate, useParams } from "react-router-dom"
import { Menu, Transition } from "@headlessui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EllipsisVerticalIcon } from "lucide-react"
import { Fragment } from "react/jsx-runtime"
import { toast } from "sonner"
import {useDraggable} from '@dnd-kit/react'
import { deleteTask } from "@/api/TaskApi"
import type { Task } from "@/types"

type TaskCardProps = {
  task: Task
  canEdit: boolean
}

function TaskCard({task, canEdit}: TaskCardProps) {
  const {ref} = useDraggable({
    id: task._id,
  })

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      toast.success(data)
    }
  })
  
  return (
    <li ref={ref} className="p-5 bg-white border border-slate-300 rounded-xl flex justify-between gap-3 cursor-grab">
      <div className="min-w-0 flex flex-col gap-y-4">
        <button
          type="button"
          className="text-xl font-bold text-slate-600 text-left"
          onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
        >{task.name}</button>
        <p className="text-slate-500">{task.description}</p>
      </div>

      <div className="flex shrink-0  gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none hover:cursor-pointer">
              <Menu.Item>
                <button
                  type="button"
                  className='w-full block p-2 text-sm text-left rounded-lg hover:bg-[#f9f4f4] transition-colors ease-out 100ms'
                  onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                >
                  Ver Tarea
                </button>
              </Menu.Item>
              {canEdit && (
                <>
                  <Menu.Item>
                    <button
                      type="button"
                      className='w-full block p-2 text-sm text-left rounded-lg hover:bg-[#f9f4f4] transition-colors ease-out 100ms'
                      onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                    >
                      Editar Tarea
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      type="button"
                      className='w-full block p-2 text-sm text-left rounded-lg hover:bg-red-50 hover:text-red-700 hover:cursor-pointer transition-colors ease-out 100ms'
                      onClick={() => mutate({projectId, taskId: task._id})}
                    >
                      Eliminar Tarea
                    </button>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  )
}

export default TaskCard
