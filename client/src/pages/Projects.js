import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectList from "../components/ProjectList";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ProjectList projects={projects} />
    </div>
  );
};

export default Projects;