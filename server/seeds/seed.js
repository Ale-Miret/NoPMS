// const db = require('../config/connection');
// const { Project, User } = require('../models');

// const projectData = require('./projectsData.json');
// const userData = require('./userData.json')

// db.once('open', async () => {
//     await Project.deleteMany({});
//     await Project.insertMany(projectData);

//     await User.deleteMany({});
//     await User.insertMany(userData);

//   console.log('Project seeded!');
//   process.exit(0);
// });


const db = require('../config/connection');
const { Project, User } = require('../models');

const projectData = require('./projectsData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  // Delete and seed users
  await User.deleteMany({});
  const createdUsers = await User.insertMany(userData);

  // Prepare project data with correct user references
  const preparedProjectData = projectData.map((project, index) => {
    const userIndex = index % createdUsers.length;
    return {
      ...project,
      projectCollaborators: [
        {
          _id: createdUsers[userIndex]._id,
          userName: createdUsers[userIndex].username,
        },
      ],
    };
  });

  // Delete and seed projects
  await Project.deleteMany({});
  await Project.insertMany(preparedProjectData);

  console.log('Data seeded!');
  process.exit(0);
});
