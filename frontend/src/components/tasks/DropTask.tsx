import { useDroppable } from '@dnd-kit/react'

function DropTask({ id, children }: { id: string, children?: React.ReactNode }) {
  const { ref, isDropTarget } = useDroppable({ id })

  return (
    <div
      ref={ref}
      className={`text-xs font-semibold uppercase p-2 rounded-xl border border-dashed mt-5 grid place-content-center text-slate-500 transition-colors
        ${isDropTarget 
          ? 'border-violet-500 bg-violet-50 text-violet-500' 
          : 'border-slate-500'
        }`}
    >
      {children ?? 'Soltar aquí'}
    </div>
  )
}

export default DropTask