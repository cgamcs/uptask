import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import CreateProjectiew from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import Error404 from './views/Error404'
import ProjectDetailsView from './views/projects/ProjectDetailsView'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<AppLayout />} >
            <Route path='/' element={<DashboardView />} index />
            <Route path='/projects/create' element={<CreateProjectiew />}  />
            <Route path='/projects/:projectId' element={<ProjectDetailsView />}  />
            <Route path='/projects/:projectId/edit' element={<EditProjectView />}  />
          </Route>
          <Route path='/404' element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}