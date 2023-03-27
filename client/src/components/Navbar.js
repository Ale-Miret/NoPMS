// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// export default function Navigation() {
//   const location = useLocation();

//   const isActive = (path) => {
//     return path === location.pathname ? 'active' : '';
//   };

//   return (
//     <nav>
//       <Link className={isActive('/')} to="/">
//         Login
//       </Link>
//       <br />
//       <Link className={isActive('/signup')} to="/signup">
//         Signup
//       </Link>
//       <br />
//       <Link className={isActive('/projects')} to="/projects">
//         Projects
//       </Link>
//       <br />
//       <Link
//         className={isActive('/cprojects/create')}
//         to="/cprojects/create"
//       >
//         Create Project
//       </Link>
//     </nav>
//   );
// }
// import React, { useState } from 'react';
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Auth from '../utils/auth';



// export default function Navigation() {
//   const location = useLocation();
//   const [currentDate, setCurrentDate] = useState(new Date());


//   const isActive = (path) => {
//     return path === location.pathname ? 'active' : '';
//   };

//   const updateCurrentDate = () => {
//     setCurrentDate(new Date());
//   };

//   setInterval(updateCurrentDate, 60000); // update date every minute

//   return (
//     <nav className="navbar">
//       {Auth.loggedIn() ? (
//                 <>
//                   <Link className={`nav-link ${isActive('/projects')}`} to="/projects">
//         Projects
//       </Link>
//       <Link
//         className={`nav-link ${isActive('/cprojects/create')}`}
//         to="/cprojects/create"
//       >
//         Create Project
//       </Link>
//                   <Link to="/" onClick={Auth.logout}>Logout</Link>
//                 </>
//               ) : (
//                 <>
//                 <Link className={`nav-link ${isActive('/')}`} to="/">
//         Login
//       </Link>
//       <Link className={`nav-link ${isActive('/signup')}`} to="/signup">
//         Signup
//       </Link>
//       </>
//               )}
//     </nav>
//   );
// }



// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Auth from '../utils/auth';

// export default function Navigation() {
//   const location = useLocation();
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const isActive = (path) => {
//     return path === location.pathname ? 'active' : '';
//   };

//    // Define a CSS class for the date span
//    const dateStyle = {
//     fontWeight: 'bold',
//     color: 'white',
//     marginLeft: '10px'
//   };

//   return (
//     <nav className="navbar">
//       {Auth.loggedIn() ? (
//         <>
//           <Link className={`nav-link ${isActive('/projects')}`} to="/projects">
//             Projects
//           </Link>
//           <Link className={`nav-link ${isActive('/cprojects/create')}`} to="/cprojects/create">
//             Create Project
//           </Link>
//           <span style={dateStyle}>Today is {currentDate.toDateString()}</span>
//           <div>{currentDate.toLocaleString()}</div>
//           <Link to="/" onClick={Auth.logout}>Logout</Link>
//         </>
//       ) : (
//         <>
//           <Link className={`nav-link ${isActive('/')}`} to="/">
//             Login
//           </Link>
//           <Link className={`nav-link ${isActive('/signup')}`} to="/signup">
//             Signup
//           </Link>
//         </>
//       )}
//     </nav>
//   );
// }

// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Flex, Spacer, Button } from "@chakra-ui/react";
// import Auth from '../utils/auth';
// import '../index.css';

// export default function Navigation() {
//   const location = useLocation();
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const isActive = (path) => {
//     return path === location.pathname ? 'active' : '';
//   };

//   return (
//     <Flex bg="black" p="4" alignItems="center">
//       {Auth.loggedIn() ? (
//         <>
//           <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>
//             <Button colorScheme="whiteAlpha">Projects</Button>
//           </Link>
//           <Link to="/cprojects/create" className={`nav-link ${isActive('/cprojects/create')}`}>
//             <Button colorScheme="whiteAlpha" ml="4">Create Project</Button>
//           </Link>
//           <Spacer />
//           <Button colorScheme="whiteAlpha" onClick={Auth.logout}>Logout</Button>
//         </>
//       ) : (
//         <>
//           <Link to="/" className={`nav-link ${isActive('/')}`}>
//             <Button colorScheme="whiteAlpha">Login</Button>
//           </Link>
//           <Link to="/signup" className={`nav-link ${isActive('/signup')}`}>
//             <Button colorScheme="whiteAlpha" ml="4">Signup</Button>
//           </Link>
//           <Spacer />
//         </>
//       )}
//     </Flex>
//   );
// }
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flex, Spacer, Button, Image } from '@chakra-ui/react';
import Auth from '../utils/auth';
import '../index.css';
import logo from '../images/NoPMS-cropped.png';

export default function Navigation() {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigation = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);

  const isActive = (path) => {
    const currentPath = location.pathname;
    if (path === currentPath || currentPath.startsWith(`${path}/`)) {
      return 'active';
    }
    return '';
  };

  const handleProjectsClick = () => {
    if (isActive('/projects')) {
    } else {
      navigation('/projects');
      setReloadKey(prevKey => prevKey + 1);
    }
  };


  return (
    <Flex className="navbar" alignItems="center">
      <Image className="navbar-logo" src={logo} alt="NoPMS logo"/>
      {Auth.loggedIn() ? (
        <>
          <Button key={reloadKey} className="navbar-btn" onClick={handleProjectsClick}>
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


