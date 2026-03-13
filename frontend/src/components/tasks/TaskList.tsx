import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import type { Task, TaskStatus } from "@/types"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"
import DropTask from "./DropTask"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus } from '@/api/TaskApi'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'

type TasklistProps = {
  tasks: Task[]
  canEdit: boolean
}

type GroupedTasks = {
  [key: string]: Task[]
}

const initialStatusProps: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: []
}

const statusStyles : {[key: string]: string } = {
  pending: 'bg-slate-500',
  onHold: 'bg-red-500',
  inProgress: 'bg-blue-500',
  underReview: 'bg-amber-500',
  completed: 'bg-emerald-500'
}

const statusBgStyles : {[key: string]: string } = {
  pending: 'bg-slate-100',
  onHold: 'bg-red-100',
  inProgress: 'bg-blue-100',
  underReview: 'bg-amber-100',
  completed: 'bg-emerald-100'
}

function TaskList({tasks, canEdit}: TasklistProps) {
  const params = useParams()
  const projectId = params.projectId!
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
    }
  })

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;
    const taskId = event.operation.source?.id as Task['_id']
    const newStatus = event.operation.target?.id as TaskStatus
    if (!taskId || !newStatus) return

    mutate({projectId, taskId, status: newStatus})
  }

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : []
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup }
  }, initialStatusProps)

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <h2 className="text-xl font-black my-5">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-75 2xl:min-w-0 2xl:w-1/5">
            <h3 
              className={`flex justify-between items-center rounded-xl text-lg font-light ${statusBgStyles[status]} py-1 px-3`}
            >
              {statusTranslations[status]}
              <span className={`h-5 w-5 block rounded-full ${statusStyles[status]}`}></span>
            </h3>

            <DropTask id={status} />

            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No hay tareas</li>
              ) : (
                tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </DragDropProvider>
  )
}

export default TaskList