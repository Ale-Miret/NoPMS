import React from 'react';
import { Link } from 'react-router-dom';




export default function Navigation() {
    return (
        <>
      <nav>
        <Link isActive={() => window.location.pathname === "/"} to="/">
          Login
        </Link>
        <br></br>
        <Link isActive={() => window.location.pathname === "/signup"} to="/signup">
          Signup
        </Link>
        <br></br>
        <Link
          isActive={() => window.location.pathname === "/projects"}
          to="/projects"
        >
          Projects
        </Link>
        <br></br>
        <Link
          isActive={() => window.location.pathname === "/projects/create"}
          to="/cprojects/create"
        >
          Create Project
        </Link>
      </nav>
      </>
    );
  }
  