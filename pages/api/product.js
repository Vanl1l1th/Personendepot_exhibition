import Product from '../../models/Product';
import Key from '../../models/Key';
import connectDb from '../../utils/connectDb';
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

export default async (req, res)=>{
  await cors(req, res)
  switch(req.method){
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req,res);
      break;
    case "DELETE":
      await handleDeleteRequest(req,res);
      break;
      case "PUT":
        await handleUpdateRequest(req,res);
        break;
    default:
      res.status(405).send(`Method${req.method} not allowed`);
      break;
  }
}

async function handleGetRequest(req, res){
  const {_id} = req.query;
  const product = await Product.findOne({_id:_id});
  res.status(200).json(product)
};

async function handlePostRequest(req, res){
  const {person, titel, description, mediaUrl} = req.body;

  try{
    if(!description){
      return res.status(442).send("please provide a description")
    }
    if(!titel){
      return res.status(442).send("please provide a titel")
    }
    //const mediaArray=[mediaUrl]
    const product = await new Product({
      person: person,
      titel: titel,
      description: description,
      mediaUrl: mediaUrl
    }).save();
    res.status(201).send(product);
  }catch(error){
    console.error(error);
    res.status(500).send("server error");
  }
}

async function handleDeleteRequest(req,res){
  const {_id} = req.query;
  await Product.findOneAndDelete({_id:_id})
  res.status(204).json({});
}

async function handleUpdateRequest(req,res){
  const {status, description, updatedMediaUrl,_id} = req.body;

  await Product.findOneAndUpdate({_id:_id},{
    status:status,
    description:description,
    mediaUrl: updatedMediaUrl
  })
  res.status(204).json({});
}
