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
    methods: ['GET', 'POST','PUT', 'OPTIONS'],
    origin:"*"

  })
)

export default async (req, res) => {
  await cors(req, res)
  const { name, password } = req.body;
  try {
    // 1) check to see if a user exists with the provided email
    const user = await User.findOne({ name }).select("+password");
    // 2) --if not, return error
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }
    // 3) check to see if users' password matches the one in db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // 4) --if so, generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      // 5) send that token to the client
      res.status(200).json(token);
    } else {
      res.status(401).send("Passwords do not match");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user");
  }
};
