import React from "react";

import NoProjects from "../../components/no-projects";
import useProject from "../../hooks/use-project";

const ProjectPermission: React.FC = () => {
  const { env, id } = useProject()

  if (!id || !env) {
    return <NoProjects />
  }

  return <span>ProjectPermission-{env}-{id}</span>
}

export default ProjectPermission