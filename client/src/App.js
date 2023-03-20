import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Projects from "./pages/Projects";
import Login from "./pages/Login";
import CreateProject from "./components/CreateProject";
import Navigation from "./components/Navbar";
import Signup from "./pages/Signup";
import ProjectDetails from "./pages/ProjectDetails";



const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navigation/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectId" element={<ProjectDetails />} />
            <Route path='/cprojects/create' element={<CreateProject />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
            
            // <Route path="/details" element={<ProjectDetails />} />
            // <Route path="/contact" element={<Contact />} />
// / import components/


// import pages
// import ProjectDetails from "./pages/ProjectDetails";
// import Contact from "./pages/Contact";