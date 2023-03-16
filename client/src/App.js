import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import components
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Project from "./components/Project";

// // import pages
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Portfolio from "./pages/Portfolio";
// import Resume from "./pages/Resume";

// function App() {
//   return (
//     <>
//       <Router>
//         <div>
//           <Header />
//           <Routes>
//             <Route path="/" element={<About />} />
//             <Route path="/portfolio" element={<Portfolio />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/resume" element={<Resume />} />
//           </Routes>
//           <Footer />
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;
