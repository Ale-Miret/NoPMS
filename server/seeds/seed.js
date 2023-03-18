const db = require('../config/connection');
const { Project } = require('../models');

const projectData = require('./projectsData.json');

db.once('open', async () => {
    await Project.deleteMany({});
    await Project.insertMany(projectData);

  console.log('Project seeded!');
  process.exit(0);
});
