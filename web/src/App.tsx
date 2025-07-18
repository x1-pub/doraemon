import { Routes, Route } from "react-router";

import BaseLayout from './components/layout';
import ProjectDetail from './pages/project-detail';
import ProjectConfig from './pages/project-config';
import ProjectPermission from './pages/project-permission';
import ProjectTask from './pages/project-task';
import NotFound from "./pages/not-found";
import Home from './pages/home';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<BaseLayout />}>
        <Route path="/detail" element={<ProjectDetail />} />
        <Route path="/config" element={<ProjectConfig />} />
        <Route path="/permission" element={<ProjectPermission />} />
        <Route path="/task" element={<ProjectTask />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
