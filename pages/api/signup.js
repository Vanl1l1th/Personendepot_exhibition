import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

connectDb();

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
    origin:"*"

  })
)

export default async (req, res) => {
  await cors(req, res)
  const { name, password } = req.body;
  try {
    // 1) Check to see if the user already exists in the db
    const user = await User.findOne({ name });
    if (user) {
      return res.status(422).send(`User already exists with email`);
    }
    // 2) --if not, hash their password
    const hash = await bcrypt.hash(password, 10);
    // 3) create user
    const newUser = await new User({
      name,
      password: hash
    }).save();
    console.log({ newUser });
    // 4) create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    // 5) send back token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again later");
  }
};
