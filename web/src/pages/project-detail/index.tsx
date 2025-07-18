import React from "react";

import NoProjects from "../../components/no-projects";
import useProject from "../../hooks/use-project";

const ProjectDetail: React.FC = () => {
  const { env, id } = useProject()

  if (!id || !env) {
    return <NoProjects />
  }

  return <span>ProjectDetail-{env}-{id}</span>
}

export default ProjectDetail