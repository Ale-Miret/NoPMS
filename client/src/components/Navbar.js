// import React from 'react';
// import { Link } from 'react-router-dom';




// export default function Navigation() {
//     return (
//         <>
//       <nav>
//         <Link isActive={() => window.location.pathname === "/"} to="/">
//           Login
//         </Link>
//         <br></br>
//         <Link isActive={() => window.location.pathname === "/signup"} to="/signup">
//           Signup
//         </Link>
//         <br></br>
//         <Link
//           isActive={() => window.location.pathname === "/projects"}
//           to="/projects"
//         >
//           Projects
//         </Link>
//         <br></br>
//         <Link
//           isActive={() => window.location.pathname === "/projects/create"}
//           to="/cprojects/create"
//         >
//           Create Project
//         </Link>
//       </nav>
//       </>
//     );
//   }
  
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

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import Auth from '../utils/auth';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return path === location.pathname ? 'active' : '';
  };

  return (
    <nav className="navbar">
      {Auth.loggedIn() ? (
                <>
                  <Link className={`nav-link ${isActive('/projects')}`} to="/projects">
        Projects
      </Link>
      <Link
        className={`nav-link ${isActive('/cprojects/create')}`}
        to="/cprojects/create"
      >
        Create Project
      </Link>
                  <Link to="/" onClick={Auth.logout}>Logout</Link>
                </>
              ) : (
                <>
                <Link className={`nav-link ${isActive('/')}`} to="/">
        Login
      </Link>
      <Link className={`nav-link ${isActive('/signup')}`} to="/signup">
        Signup
      </Link>
      </>
              )}
    </nav>
  );
}

