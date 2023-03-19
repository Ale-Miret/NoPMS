// // import user model
// const { User } = require("../models");
// // import sign token function from auth
// const { signToken } = require("../utils/auth");

// const resolvers = {
//   Query: {
//     allUsers: async () => {return await User.find({})},
//     user: async (_, args) => User.findOne(args),
//   users: async (_, args) => User.find(args),
//     // get a single user by either their id or their username
//     me: async (parent, args, context) => {
//       if (context.user) {
//         return User.findOne({ _id: context.user._id });
//       }
//       throw new AuthenticationError("You need to be logged in!");
//     },
//   },
//   Mutation: {
//     // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
//     addUser: async (parent, { username, email, gitHubUserName, password }) => {
//       const user = await User.create({ username, email, gitHubUserName, password });
//       const token = signToken(user);
//       return { token, user };
//     },
//     // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError("No user found with this email address");
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError("Incorrect credentials");
//       }

//       const token = signToken(user);

//       return { token, user };
//     },
//     saveProject: async (parent, { newProject }, context) => {
//       if (context.user) {
//         return User.findOneAndUpdate(
//           { _id: context.user._id },
//           {
//             $addToSet: { savedProjects: newProject },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       }
//       throw new AuthenticationError("You need to be logged in!");
//     },
//     removeProject: async (parent, { projectId }, context) => {
//       if (context.user) {
//         return Thought.findOneAndUpdate(
//           { _id: context.user._id },
//           {
//             $pull: { savedProjects: projectId },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       }
//       throw new AuthenticationError("You need to be logged in!");
//     },
//   },
// };

// module.exports = resolvers;

// import user model
const { User, Project, Collaborator } = require("../models");

// import the AuthenticationError object
const { AuthenticationError } = require("apollo-server-express"); 

// import jsonwebtoken
const jwt = require("jsonwebtoken");

// set the secret and expiration time for the token
const secret = "mysecretssshhhhhhh";
const expiration = "2h";

const resolvers = {
  Query: {
    allUsers: async () => {return await User.find({})},
    user: async (_, args) => User.findOne(args),
    users: async (_, args) => User.find(args),
    // get a single user by either their id or their username
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // ...
    projects: async () => {
      return await Project.find({});
    },
  // ...
  },
  
  Mutation: {
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, { username, email, gitHubUserName, password }) => {
      const user = await User.create({ username, email, gitHubUserName, password });
      const token = jwt.sign({ data: user }, secret, { expiresIn: expiration });
      return { token, user };
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = jwt.sign({ data: user }, secret, { expiresIn: expiration });

      return { token, user };
    },
    saveProject: async (parent, { newProject }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedProjects: newProject },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { savedProjects: projectId },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    
    updateUser: async (parent, { username, email, gitHubUserName, password }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { username, email, gitHubUserName, password },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    
    // deleteUser: async (parent, args, context) => {
    //   if (context.user) {
    //     const deletedUser = await User.findOneAndDelete({ _id: context.user._id });
    //     return deletedUser;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },

    deleteUser: async (parent, { _id }, context) => {
      if (context.user) {
        const deletedUser = await User.findOneAndDelete({ _id });
        return deletedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    
  },
  
};

module.exports = resolvers;

