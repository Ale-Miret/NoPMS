import { Link } from "react-router-dom";

const ProjectList = ({ projects, title }) => {
    
    return ( 
        <div className="project-page">
            <div>
                <h2>Create Projects</h2>
                <h2>Manage Projects</h2>
            </div>
            <div>
                
                <h3>Project Name</h3>
                <p>Description</p>
                <p>Collaborators</p>
                <p>date created</p>
                <p>purpose</p>
                    <div>
                        <h3>technologies</h3>
                        <h3>github repo</h3>
                    </div>
            </div>
        </div>
     );
}
 
export default ProjectList;