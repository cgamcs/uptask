import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import type { User } from '@/types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  name: User['name']
}

export default function NavMenu({name} : NavMenuProps) {
  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN_UPTASK')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-sm bg-purple-500 outline-0">
        <Menu className='text-white' />        
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute -left-20 lg:left-1/2 z-10 mt-5 flex w-60 lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p className='text-center'>Hola: {name}</p>
            <Link
              to='/profile'
              className='block p-2 rounded-lg hover:bg-[#f9f4f4] transition-colors ease-out 100ms'
            >Mi Perfil</Link>
            <Link
              to='/'
              className='block p-2 rounded-lg hover:bg-[#f9f4f4] transition-colors ease-out 100ms'
            >Mis Proyectos</Link>
            <button
              className='block p-2 rounded-lg hover:bg-red-50 hover:text-red-700 hover:cursor-pointer text-left w-full transition-colors ease-out 100ms'
              type='button'
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}