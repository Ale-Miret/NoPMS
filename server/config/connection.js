const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/NoPMS',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);