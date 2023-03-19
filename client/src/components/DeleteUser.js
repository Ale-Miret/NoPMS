// import React from 'react';

// const DeleteUser = () => {
//     const handleDelete = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           if (!token) {
//             throw new Error('You must be logged in to delete your account');
//           }
//           const response = await fetch('/graphql', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({ query: 'mutation { deleteUser }' }),
//           });
//           const data = await response.json();
//           console.log(data);
//         } catch (err) {
//           console.error(err);
//         }
//       };
      

//   return (
//     <button onClick={handleDelete}>Delete User</button>
//   );
// };

import React from 'react';

const DeleteUser = () => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to delete your account');
      }
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query: 'mutation { deleteUser }' }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default DeleteUser;
