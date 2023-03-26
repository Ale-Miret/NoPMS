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


// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// import ProjectList from '../components/ProjectList';
// import { GET_PROJECTS } from '../utils/queries';
// import Auth from '../utils/auth';




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




// const Projects = () => {
//   const { loading, error, data } = useQuery(GET_PROJECTS);

//   const [projects, setProjects] = useState([]);
//   const userId = Auth.getProfile()?.data?._id;

//   useEffect(() => {
//     if (data && userId) {
//       console.log('All projects:', data.projects); // log all projects
//       console.log('User ID:', userId); // log user ID
//       const filteredProjects = data.projects.filter((project) => {
//         return project.userId === userId;
//       });
//       console.log('Filtered projects:', filteredProjects); // log filtered projects
//       setProjects(filteredProjects);
//     }
//   }, [data, userId]);

//   console.log('Projects:', projects); // log projects

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
import CollaboratingProjects from '../components/CollaboratingProjects';
import { GET_PROJECTS } from '../utils/queries';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT, REMOVE_COLLABORATOR } from '../utils/mutations';
import { Box, Heading } from "@chakra-ui/react";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [removeCollaborator] = useMutation(REMOVE_COLLABORATOR);
  const [projects, setProjects] = useState([]);
  const [collabProjects, setCollabProjects] = useState([]);
  const userId = Auth.getProfile()?.data?._id;
  const [removeProject] = useMutation(REMOVE_PROJECT);

  useEffect(() => {
    if (data && userId) {
      console.log('All projects:', data.projects); // log all projects
      console.log('User ID:', userId); // log user ID
      const filteredCollabProjects = data.projects.filter((project) => {
        return project.projectCollaborators?.some(collaborator => collaborator.userName === userId);
      });
  
      console.log('filteredCollabProjects:', filteredCollabProjects);// log filtered Collaborative Projects
      if(filteredCollabProjects.length > 0 && filteredCollabProjects[0].projectName !== null && filteredCollabProjects[filteredCollabProjects.length -1].projectName !== null){
        setCollabProjects(filteredCollabProjects);
      }
    }
  }, [data, userId]);
  

  useEffect(() => {
    if (data && userId) {
      console.log('All projects:', data.projects); // log all projects
      console.log('User ID:', userId); // log user ID
      const filteredProjects = data.projects.filter((project) => {
        return project.userId === userId;
      });
  
      console.log('Filtered projects:', filteredProjects); // log filtered projects
      if(filteredProjects.length > 0 && filteredProjects[0].projectName !== null){
        setProjects(filteredProjects);
      }
    }
  }, [data, userId]);
  

  console.log('Projects:', projects); // log projects
  console.log('collabProjects:', collabProjects); // log projects

  const handleDeleteProject = async (projectId) => {
    try {
      await removeProject({
        variables: { projectId },
      });
      // remove the deleted project from state
      const updatedProjects = projects.filter((project) => project._id !== projectId);
      setProjects(updatedProjects);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveCollab = async (projectId, userId) => {
    try {
      await removeProject({
        variables: {
          projectId,
          collaboratorId: userId,
        },
      });
      // remove the logged-in user from the collaborators array of the project
      const updatedCollabProjects = collabProjects.map((project) => {
        if (project._id === projectId) {
          return {
            ...project,
            projectCollaborators: project.projectCollaborators.filter(
              (collaborator) => collaborator._id !== userId
            ),
          };
        }
        return project;
      });
    } catch (err) {
      console.error(err);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box
    position="relative"
    overflow="hidden"
  >
    <Box className="gradient-bg"/>
      <Box maxW="800px" mx="auto" p={4}>
        <Box>
          <Heading as="h1" size="xl" mb={8}>My Projects</Heading>
          <ProjectList projects={projects} handleDeleteProject={handleDeleteProject} />
        </Box>
        <Box>
          <Heading as="h1" size="xl" mb={8}>Collaborative Projects</Heading>
          <CollaboratingProjects projects={collabProjects} handleRemoveCollab={handleRemoveCollab} />
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;