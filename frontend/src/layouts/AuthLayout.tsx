import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

function AuthLayout() {
  return (
    <>
      <div className='bg-gray-800 min-h-screen'>
        <div className='py-10 lg:py-20 mx-auto w-112.5'>
          <Logo />

          <div className='mt-10'>
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  )
}

export default AuthLayout