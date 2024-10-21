import Key from '../../models/Key';
import connectDb from '../../utils/connectDb';
import jwt from "jsonwebtoken";
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

connectDb();

const cors = initMiddleware(
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
    default:
      res.status(405).send(`Method${req.method} not allowed`);
      break;
  }
}

function generateCode(){
  let newCode = [];
  const characters = 'A1B2C3D4E5F6G7H89J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4YZ5a6b7c8d9e0f1g2h3i4j5k67m8n9o0p1q2r3s4t5u6v7w8x9y0z0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < 9; i++ ) {
      newCode.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
  return newCode.join('');
}

async function handleGetRequest (req,res){
  let person=0;
  let code="";
  //let key;
  try{
   //for(let j=0;j<300;j++){
          const lastPerson= await Key.findOne().sort({ person: -1 }).limit(1);
          person = lastPerson.person + 1;
          code = generateCode();
          let checkKey = await Key.findOne({code:code});
          if(checkKey){
            console.log("g new code");
            code=generateCode();
          }
           const key = await new Key({person:person,code:code}).save()
    //}
    //const keyss = await Key.find();
    //console.log(JSON.stringify(keyss));
    res.status(201).send(key);
  }catch(error){
    console.error(error);
    res.status(500).send("server error")
  }

}

async function handlePostRequest (req, res) {
  const {code} = req.body;
        if(code.length !== 9){
          return res.status(442).send("this code does not exists")
        }
  try {
    // 1) check to see if a user exists with the provided email
    const key = await Key.findOne({ code:code });
    // 2) --if not, return error
    if (!key) {
      return res.status(404).send("This code does not exist");
    }
    const person = key.person;

    // 4) --if so, generate a token
      const tokenKey = jwt.sign({ userId: key._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      // 5) send that token to the client
      res.status(200).json({tokenKey,person});

  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};
