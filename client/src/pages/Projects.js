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




// import React, { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import ProjectList from "../components/ProjectList";
// import { GET_PROJECTS } from "../utils/queries";

// const Projects = () => {
//   const { loading, error, data } = useQuery(GET_PROJECTS, {
//     fetchPolicy: 'network-only',
//   });
  
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     if (data) {
//       setProjects(data.projects);
//     }
//   }, [data]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Projects</h1>
//       <ProjectList projects={projects} />
//     </div>
//   );
// };

// export default Projects;


import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import { GET_PROJECTS } from '../utils/queries';
import Auth from '../utils/auth';

// const Projects = () => {
//   const { loading, error, data } = useQuery(GET_PROJECTS, {
//     // fetchPolicy: 'network-only',
//   });

//   const [projects, setProjects] = useState([]);
//   const userId = Auth.getProfile()?.data?._id;

//   useEffect(() => {
//     if (data && userId) {
//       console.log('All projects', data.projects);
//       console.log("userId", userId);
//       setProjects(data.projects.filter((project) => {
//         return project.userId === userId, console.log("project",project.userId);
//       }));
//     }
//   }, [data, userId]);
//   // console.log("useEffect", useEffect())
//   console.log("data", data);
//   useEffect(() => {
//     console.log("Projects:", projects);
//   }, [projects]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Projects</h1>
//       <ProjectList projects={projects} />
//     </div>
//   );
// };

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const [projects, setProjects] = useState([]);
  const userId = Auth.getProfile()?.data?._id;

  useEffect(() => {
    if (data) {
      console.log('All projects:', data.projects); // log all projects
      console.log('User ID:', userId); // log user ID
      const filteredProjects = data.projects.filter((project) => {
        return project.userId === userId;
      });
      console.log('Filtered projects:', filteredProjects); // log filtered projects
      setProjects(filteredProjects);
    }
  }, [data, userId]);

  console.log('Projects:', projects); // log projects

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