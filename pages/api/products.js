import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
let countInit=0;
let randomProducts=[];

connectDb();

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options

    // Only allow requests with GET, POST and OPTIONS
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST','PUT', 'OPTIONS'],
      origin:"*"

    })
  )

export default async(req,res)=>{
  await cors(req, res)
  const {user1,person}= req.query;
  let products = [];
  if(user1&&!person&&user1!=="profil"){

    products = await Product.find().sort({updatedAt: -1});

  }else if(!user1&&!person&&user1!=="profil"){

    //console.log("online stuff");
    if(countInit===0){
      countInit=1;
      const rawproducts = await Product.find({status:'online'})
      let indexes=[];
      for(let i=0; i<rawproducts.length;i++){
        indexes.push(i);
      }
      for(let j=0;j<rawproducts.length;j++){
        let r=getRandomInt(indexes.length);
        let rr=indexes[r]
        products.push(rawproducts[rr]);
        indexes.splice(r, 1);
      }
      randomProducts=products;
    }else{
      products=randomProducts;
        //products = await Product.find().sort({updatedAt: -1});
    }
    // products = await Product.find({
    //   status:'online'
    // }).sort({updatedAt: -1})

  }else if(user1==="profil"&&person){

    //console.log("person stuff");
    products = await Product.find({
      person: person
    }).sort({updatedAt: -1})
  }

  res.status(200).json(products);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
