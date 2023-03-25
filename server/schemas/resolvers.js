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

const { ObjectId } = require('mongodb');

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
    userById: async (_, { userId }) => User.findOne({ _id: userId.toString() }),
    userByUsername: async (_, { username }) => {
      console.log(username);
      try {
        return await User.findOne({ username });
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

    addCollaborator: async (parent, { projectId, positionName, username, userId }, context) => {
      console.log(`username: `, username);
      console.log('project ID: ', projectId);
      console.log('position Name: ', positionName);

      // check if user is logged in
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to add a collaborator');
      }
      try {
        // find the project
        const project = await Project.findById(projectId).populate('projectCollaborators');
        console.log('Project: ', project);

        // find the user by userId
        const user = await User.findById(userId);
        console.log(`user: ${user}`);
    
        if (!user) {
          throw new Error('User not found');
        }
    
        // check if the user is already a collaborator
        const collaborators = project.projectCollaborators || [];
        const isCollaborator = collaborators.some(collaborator => collaborator.userName.equals(user._id)  && collaborator.projectId.equals(project._id));
        console.log(`isCollaborator: ${isCollaborator}`);
    
        if (isCollaborator) {
          throw new Error('User is already a collaborator');
        }
    
        // create a new collaborator object
        const collaborator = new Collaborator({
          userName: user._id,
          projectId: project._id,
          positionName: positionName,
        });
    
        // initialize collaborators array if undefined or null
        if (!project.projectCollaborators) {
          project.projectCollaborators = [];
        }
    
        // add the collaborator to the project
        project.projectCollaborators.push(collaborator);
    
        // save the project and the collaborator
        await project.save();
        await collaborator.save();
    
        console.log('Project:', project);
        console.log('Collaborator:', collaborator);
    
        // return only necessary fields from the collaborator object
        return collaborator.toObject({ getters: true });
      } catch (err) {
        console.log(err);
        console.log(`addcollab userID err: ${userObjectId}`)
        console.log(`addcollab username err: ${username}`)
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
    },

    addComment: async (parent, { projectId, commentText }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};



module.exports = resolvers;
