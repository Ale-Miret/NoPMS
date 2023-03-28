// Import necessary dependencies
import { createContext, useContext, useState } from "react";

// Create context for project-related data
const ProjectContext = createContext();

// Create custom hook to access project-related data from the context
export const useProjectContext = () => useContext(ProjectContext);


// Create a provider component that will wrap the app and provide access to project-related data via context
export const ProjectProvider = ({ children }) => {
  const [projectUpdateFlag, setProjectUpdateFlag] = useState(false);

  // Function to toggle the project update flag when it is clicked
  const toggleProjectUpdateFlag = () => {
    setProjectUpdateFlag(!projectUpdateFlag);
  };

  // Provide the project update flag and the toggleProjectUpdateFlag function to the context
  return (
    <ProjectContext.Provider value={{ projectUpdateFlag, toggleProjectUpdateFlag }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Export the ProjectContext so it can be used elsewhere in the app
export default ProjectContext;