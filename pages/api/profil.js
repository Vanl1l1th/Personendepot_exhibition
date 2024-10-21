import Key from "../../models/Key";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";
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
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET);
    const key = await Key.findOne({ _id: userId });
    if (key) {
      res.status(200).json(key);
    } else {
      res.status(404).send("Key not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};
