import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { validateRegisterInput, validateLoginInput } from "../utils/validators.js";
import jwt from 'jsonwebtoken';

const generateJwt = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name
  }, process.env.SECRET_TOKEN, {
    expiresIn: "24h"
  });
}

const signup = async (req, res, next) => {

  const { username, email, password, cPassword } = req.body;
  const { errors, valid } = validateRegisterInput({ username, email, password, cPassword });
  if (!valid) {
    res.json({
      status: 403,
      errors
    })
  };
  const user = await findOne({ email });
  if (user) {
    errors.user = "User already exists"
    res.json({
      status: 403,
      errors
    })
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
    status: 200,
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

  const user = await findOne({ email });

  if (!user) {
    errors.user = "User not found";
    res.json({
      status: 404,
      errors
    })
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    errors.match = "Password doesn't match"
    res.json({
      status: 403,
      errors
    })
  }

  const token = generateJwt(user);

  res.json({
    status: 200,
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
}

export {
  signup,
  login
}