import { Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"

function AppLayout() {
  return (
    <>
      <header className="bg-gray-800">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto flex px-5 lg:px-0 flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>

          <NavMenu />
        </div>
      </header>

      <section className="max-w-7xl 2xl:max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          César García - {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}

export default AppLayout