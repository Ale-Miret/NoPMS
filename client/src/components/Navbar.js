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

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Navigation() {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());

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
          <Link className={`nav-link ${isActive('/cprojects/create')}`} to="/cprojects/create">
            Create Project
          </Link>
          <Link to="/" onClick={Auth.logout}>Logout</Link>
          <span className="navbar-date">{currentDate.toDateString()}</span>
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
