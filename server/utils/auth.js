// const jwt = require('jsonwebtoken');

// const secret = 'mysecretssshhhhhhh';
// const expiration = '2h';

// module.exports = {
//   authMiddleware: function ({ req }) {
//     let token = req.body.token || req.query.token || req.headers.authorization;

//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (!token) {
//       return req;
//     }

//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//     }

//     return req;
//   },
//   signToken: function ({ email, username, _id }) {
//     const payload = { email, username, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };

const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'your-secret-key-here';
const expiration = '2h';

const authMiddleware = async ({ req }) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      const { id } = jwt.verify(token, secret);
      const user = await User.findById(id);
      return { user };
    } catch (err) {
      throw new Error('Invalid/expired token');
    }
  }
  return {};
};

const signToken = ({ email, username, _id }) => {
  const payload = { email, username, _id };
  return jwt.sign({ id: _id }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };
