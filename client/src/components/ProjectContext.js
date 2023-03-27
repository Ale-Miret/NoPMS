import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projectUpdateFlag, setProjectUpdateFlag] = useState(false);

  const toggleProjectUpdateFlag = () => {
    setProjectUpdateFlag(!projectUpdateFlag);
  };

  return (
    <ProjectContext.Provider value={{ projectUpdateFlag, toggleProjectUpdateFlag }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;