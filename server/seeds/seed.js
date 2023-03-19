const db = require('../config/connection');
const { Project, User } = require('../models');

const projectData = require('./projectsData.json');
const userData = require('./userData.json')

db.once('open', async () => {
    await Project.deleteMany({});
    await Project.insertMany(projectData);

    await User.deleteMany({});
    await User.insertMany(userData);

  console.log('Project seeded!');
  process.exit(0);
});
