import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";
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
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};
