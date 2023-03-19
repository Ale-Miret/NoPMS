// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProjectList from "../components/ProjectList";

// const Projects = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/projects")
//       .then((response) => {
//         setProjects(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Projects</h1>
//       <ProjectList projects={projects} />
//     </div>
//   );
// };

// export default Projects;

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProjectList from "../components/ProjectList";
import { GET_PROJECTS } from "../utils/queries";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    fetchPolicy: 'network-only',
  });
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (data) {
      setProjects(data.projects);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Projects</h1>
      <ProjectList projects={projects} />
    </div>
  );
};

export default Projects;