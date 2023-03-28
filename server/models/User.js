// Import Schema & bcrypt for encrypting passwords
const { Schema, model } = require('mongoose');
const bcrypt= require('bcryptjs');

// User Schema
const userSchema = new Schema(
  {
    // String Input for username
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // String Input for email with Regex email matching
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    // String Input for github username
    gitHubUserName: {
      type: String,
    },
    // String Input for github password
    password: {
      type: String,
      required: true,
    },
    
    savedProjects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
