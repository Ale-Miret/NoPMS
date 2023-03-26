// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';

// import Auth from '../utils/auth';

// const Login = (props) => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error, data }] = useMutation(LOGIN_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);
//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });

//       Auth.login(data.login.token);
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <main className="flex-row justify-center mb-4">
//       <div className="col-12 col-lg-10">
//         <div className="card">
//           <h4 className="card-header bg-dark text-light p-2">Login</h4>
//           <div className="card-body">
//             {data ? (
//               <p>
//                 Success! You may now head{' '}
//                 <Link to="/">back to the homepage.</Link>
//               </p>
//             ) : (
//               <form onSubmit={handleFormSubmit}>
//                 <input
//                   className="form-input"
//                   placeholder="Your email"
//                   name="email"
//                   type="email"
//                   value={formState.email}
//                   onChange={handleChange}
//                 />
//                 <input
//                   className="form-input"
//                   placeholder="******"
//                   name="password"
//                   type="password"
//                   value={formState.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   className="btn btn-block btn-primary"
//                   style={{ cursor: 'pointer' }}
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </form>
//             )}

//             {error && (
//               <div className="my-3 p-3 bg-danger text-white">
//                 {error.message}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';
// import Auth from '../utils/auth';
// import { Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

// const Login = (props) => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error, data }] = useMutation(LOGIN_USER);
//   const navigate = useNavigate();

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);
//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });

//       Auth.login(data.login.token);
//       await navigate('/projects');
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <Box maxW="600px" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
//       <Box bg="white" p={6}>
//         <Heading as="h1" size="xl" textAlign="center" mb={8}>Login</Heading>
//         <FormControl id="email" mb={4}>
//         <FormLabel>Email</FormLabel>
//         <Input
//           type="email"
//           placeholder="Your email"
//           name="email"
//           value={formState.email}
//           onChange={handleChange}
//         />
//       </FormControl>
//       <FormControl id="password" mb={4}>
//         <FormLabel>Password</FormLabel>
//         <Input
//           type="password"
//           placeholder="******"
//           name="password"
//           value={formState.password}
//           onChange={handleChange}
//         />
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         size="lg"
//         width="100%"
//         mt={4}
//         onClick={handleFormSubmit}
//         disabled={!formState.email || !formState.password}
//       >
//         Submit
//       </Button>
//       </Box>


//     {error && (
//         <Box mt={4} p={4} bg="red.500" color="white">
//           {error.message}
//         </Box>
//       )}
//       {data && (
//         <Box mt={4} p={4} bg="green.500" color="white">
//           Success! You may now head <Link to="/">back to the homepage.</Link>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import '../index.css';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      await navigate('/projects');
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      height="100vh"
    >
      <Box
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom right, #008080, #FFA500, #800080)",
          opacity: 0.8,
          zIndex: -1,
        }}
      />
      <Box
        className="login-card"
        maxW="600px"
        mx="auto"
        mt={8}
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
      >
        <Heading as="h1" size="lg" textAlign="center" bg="black" color="white" mb={8}>Login</Heading>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Your email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="******"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button
          bg="black"
          color="white"
          _hover={{ bg: 'gray.600' }}
          size="lg"
          width="100%"
          mt={4}
          onClick={handleFormSubmit}
          disabled={!formState.email || !formState.password}
          
        >
          Submit
        </Button>
      </Box>
      {error && (
        <Box mt={4} p={4} bg="red.500" color="white">
          {error.message}
        </Box>
      )}
      {data && (
        <Box mt={4} p={4} bg="green.500" color="white">
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </Box>
      )}
    </Box>
  );
};

export default Login;
