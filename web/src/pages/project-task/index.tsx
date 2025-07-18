import React from "react";

import NoProjects from "../../components/no-projects";
import useProject from "../../hooks/use-project";

const ProjectTask: React.FC = () => {
  const { env, id } = useProject()

  if (!id || !env) {
    return <NoProjects />
  }

  return <span>ProjectTask-{env}-{id}</span>
}

export default ProjectTask