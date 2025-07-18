import { useContext } from "react"

import { BaseContext } from "../components/layout"

const useProject = () => {
  const project = useContext(BaseContext)
  return project
}

export default useProject