import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import baseUrl from "../utils/baseUrl";
let user1;




function Home({user,products,key}) {
  user1=user;
  //console.log(user1);
  
  return <ProductList products={products} user={user}/>;
}
Home.getInitialProps = async(ctx) =>{
  //fetch data on server
  //const pageProps = await Home.getInitialProps(ctx);
  const person='';
  const url = `${baseUrl}/api/products`;
  const payload = {params:{user1,person}}
  const response = await axios.get(url,payload);
  return {products: response.data};
}

export default Home;
