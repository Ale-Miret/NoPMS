import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Project from "./components/Project";

// import pages
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/project" element={<Project />} />
            <Route path="/details" element={<ProjectDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
