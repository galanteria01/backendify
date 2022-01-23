const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validateRegisterInput, validateLoginInput } = require("../utils/validators");
const jwt = require('jsonwebtoken');

const generateJwt = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name
  }, process.env.SECRET_TOKEN, {
    expiresIn: "1h"
  });
}

const signup = async (req, res, next) => {

  const { username, email, password, cPassword } = req.body;
  const { errors, valid } = validateRegisterInput({ username, email, password, cPassword });
  if (!valid) {
    console.log(errors)
    throw new Error("Authentication failed");
  };
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  const response = await newUser.save();

  const token = generateJwt(response);

  res.json({
    token,
    user: {
      id: response.id,
      username: response.username,
      email: response.email
    }
  });

}

const login = async (req, res, next) => {

  const { email, password } = req.body;
  const { errors, valid } = validateLoginInput(req.body);

  if (!valid) throw new Error(errors);

  const user = await User.findOne({ email });

  if (!user) {
    errors.user = "User not found";
    throw new Error("User doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Password doesn't match");
  }

  const token = generateJwt(user);

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
}

module.exports = {
  signup,
  login
}