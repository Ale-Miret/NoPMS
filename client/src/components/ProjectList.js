// import React from "react";

// const ProjectList = ({ projects }) => {
//   return (
//     <ul>
//       {projects.map((project) => (
//         <li key={project._id}>
//           <h2>{project.projectName}</h2>
//           <p>{project.description}</p>
//           <a href={project.gitHubLink}>GitHub Link</a>
//           <ul>
//             {project.projectCollaborators.map((collaborator) => (
//               <li key={collaborator._id}>{collaborator.name}</li>
//             ))}
//           </ul>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ProjectList;


// import React from 'react';

// const ProjectList = ({ projects }) => {
//   return (
//     <div>
//       {projects.map((project) => (
//         <div key={project._id}>
//           <h3>{project.projectName}</h3>
//           <p>{project.description}</p>
//           <a href={project.gitHubLink}>GitHub Link</a>
//           <p>Collaborators:</p>
//           <ul>
//             {project.projectCollaborators.map((collaborator) => (
//               <li key={collaborator._id}>{collaborator.userName}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProjectList;

import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <Link to={`/project/${project._id}`}>
            <h3>{project.projectName}</h3>
          </Link>
          <p>{project.description}</p>
          <p>GitHub Link: {project.gitHubLink}</p>
          <h4>Collaborators:</h4>
          <ul>
            {project.projectCollaborators.map((collaborator) => (
              <li key={collaborator._id}>{collaborator.userName}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;