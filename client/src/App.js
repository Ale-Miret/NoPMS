import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react'

import Projects from "./pages/Projects";
import Login from "./pages/Login";
import CreateProject from "./components/CreateProject";
import Navigation from "./components/Navbar";
import Signup from "./pages/Signup";
import ProjectDetails from "./pages/ProjectDetails";
import AddCollaborator from './components/AddCollaborator';
import Footer from './components/Footer';



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
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Router>
        <Flex flexDirection="column" minHeight="100vh">
            <Navigation/>
            <Box flexGrow={1}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:projectId" element={<ProjectDetails />} />
              <Route path="/project/:projectId/collaborators" element={<AddCollaborator />} />
              <Route path='/cprojects/create' element={<CreateProject />} />
            </Routes>
            </Box>
            <Footer />
            </Flex>
        </Router>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
            
            // <Route path="/details" element={<ProjectDetails />} />
            // <Route path="/contact" element={<Contact />} />
// / import components/


// import pages
// import ProjectDetails from "./pages/ProjectDetails";
// import Contact from "./pages/Contact";