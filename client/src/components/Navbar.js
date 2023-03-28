import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flex, Spacer, Button, Image } from '@chakra-ui/react';
import Auth from '../utils/auth';
import '../index.css';
import logo from '../images/NoPMS-cropped.png';
import { useProjectContext } from '../components/ProjectContext'; 

export default function Navigation() {
    // Set the current location
  const location = useLocation();
   // Set the current date and time
  const [currentDate, setCurrentDate] = useState(new Date());
  // Use the navigate function for navigation
  const navigation = useNavigate();
   // Use the project context to toggle project update flag
  const { toggleProjectUpdateFlag } = useProjectContext();

  // Check if the current path is active and apply the active class
  const isActive = (path) => {
    const currentPath = location.pathname;
    if (path === currentPath || currentPath.startsWith(`${path}/`)) {
      return 'active';
    }
    return '';
  };

   // Handle click on Projects button
  const handleProjectsClick = () => {
    if (isActive('/projects')) {
      toggleProjectUpdateFlag();
    } else {
      navigation('/projects');
    }
  };


  return (
    <Flex className="navbar" alignItems="center">
      <Image className="navbar-logo" src={logo} alt="NoPMS logo"/>
      {Auth.loggedIn() ? (
        <>
          <Button className="navbar-btn" onClick={handleProjectsClick}>
            Projects
          </Button>
          <Link to="/cprojects/create" className={`nav-link ${isActive('/cprojects/create')}`}>
            <Button className="navbar-btn" ml="4">
              Create Project
            </Button>
          </Link>
          <Spacer />
          <Button className="navbar-btn" onClick={Auth.logout}>
            Logout
          </Button>
        </>
      ) : (
        // If the user is not logged in, show Login and Signup buttons
        <>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Button className="navbar-btn">Login</Button>
          </Link>
          <Link to="/signup" className={`nav-link ${isActive('/signup')}`}>
            <Button className="navbar-btn" ml="4">
              Signup
            </Button>
          </Link>
          <Spacer />
        </>
      )}
    </Flex>
  );
}


