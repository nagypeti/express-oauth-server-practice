const url = require('url');
const path = require('path');
const jwt = require("jsonwebtoken");

const users = [
  {
    uid: 'ibe38172gisp1of0y82h32',
    email: 'peter@test-site.com',
    password: 'peter'
  },
  {
    uid: 'ibc34572wesuuf0y82h32a',
    email: 'test@test-site.com',
    password: 'test'
  },
  {
    uid: 'jbe34472gisp1vf0y82h32',
    email: 'email@email.hu',
    password: 'password'
  }
];

const authUser = ({ email, password }) => {
  if (!email || !password) {
    return {};
  }
  return users.find(user => { return user.email == email && user.password == password });;
}

const getCode = user => {
  if (!user) { 
    return {};
  }

  const payload = {
    uid: user.uid,
    email: user.email
  }

  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

const getAccessToken = ({ uid, email}) => {
  if (!uid || !email) {
    return {};
  }

  return jwt.sign({uid, email}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

const decryptAuthorizationCode = code => {
  if (!code) {
    return {};
  }
  return jwt.verify(code, process.env.TOKEN_SECRET);
}


module.exports.index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
}

module.exports.authenticate = (req, res) => {
  const user = authUser(req.body);
  const code = getCode(user);

  res.redirect(url.format({
    pathname: req.body.redirect_uri,
    query: {
      state: req.body.state,  
      code: code
    }
  }));
}

module.exports.getTokenPair = (req, res) => {
  const tokenPayload = decryptAuthorizationCode(req.body.code);
  const access_token = getAccessToken(tokenPayload);

  let response;

  if (!access_token) {
    response = { error: 'invalid_grant' }
  }

  response = {
    token_type: 'Bearer',
    access_token,
    expires_in: '1800s'
  }

  res.json(response);
}