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
    allUsers: async () => { return await User.find({}) },
    user: async (_, args) => User.findOne(args),
    users: async (_, args) => User.find(args),
    userByUsername: async (parent, { username }, context) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('User not found');
        }
        return user.toObject({ getters: true });
      } catch (err) {
        console.log(err);
        throw new Error('Something went wrong');
      }
    },
    // get a single user by either their id or their username
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // ...
    projects: async () => {
      return await Project.find({}).populate('projectCollaborators');
    },
    // ...
    project: async (_, { projectId }) => {
      return await Project.findById(projectId).populate('projectCollaborators');
    },
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



    createProject: async (parent, { projectName, description, gitHubLink, projectCollaborators, userId }, context) => {
      if (context.user) {
        const newProject = await Project.create({
          projectName,
          description,
          gitHubLink,
          projectCollaborators,
          userId,
          owner: context.user._id,
        });

        await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedProjects: newProject._id } });

        return newProject;
      }
      throw new AuthenticationError("Error creating project. Please try again later.");
    },

    addCollaborator: async (parent, { projectId, positionName, username }, context) => {
      // check if user is logged in
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to add a collaborator');
      }

      try {
        // find the project
        const project = await Project.findById(projectId);

        // find the user by username
        const user = await User.findOne({ username });

        if (!user) {
          throw new Error('User not found');
        }

        // check if the user is already a collaborator
        const isCollaborator = project.collaborators.some(
          collaborator => collaborator.user.toString() === user._id.toString()
        );

        if (isCollaborator) {
          throw new Error('User is already a collaborator');
        }

        // create a new collaborator object
        const collaborator = new Collaborator({
          user: user._id,
          project: project._id,
          positionName: positionName
        });

        // add the collaborator to the project
        project.collaborators.push(collaborator);

        // save the project and the collaborator
        await project.save();
        await collaborator.save();

        // return only necessary fields from the collaborator object
        return collaborator.toObject({ getters: true });
      } catch (err) {
        console.log(err);
        throw new Error('Something went wrong');
      }
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
      throw new AuthenticationError("Error saving project. Please try again later.");
    },


    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
          throw new Error("Failed to delete project");
        }

        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedProjects: projectId } },
          { new: true }
        );

        return deletedProject;
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
      throw new AuthenticationError("Error updating user. Please try again later.");
    }
  },
};

module.exports = resolvers;
