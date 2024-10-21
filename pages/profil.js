import Link from 'next/link';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import React from 'react';



function Profil({thekey, products}) {

  return (
    <>

    <div className="profilInfo">
      <p>My Profil, {products.length} Entries</p>
    </div>

    <div className="profilContainer">

      <Link href="/create">
      <div className="profilAdd">
      <h4>&rarr; Add Submisson</h4>
      </div>
      </Link>

      {products.map((value) => {
        return(
          <Link href={`/product?_id=${value._id}`} key={value._id}>
          <div className="profilCard" key={value._id}>
            <img src={value.mediaUrl[0]} className={value.status+"Blur"} width="100%"/>
            <p className={value.status+"Titel"}>in process...<br/>It can take some time until your Submisson is online</p>
            <div className="profilCardTitel">
            <p>{value.titel} <span className="highlight">&rarr;</span></p>
            </div>
          </div>
          </Link>
        )
      })}
    </div>

    </>
  );
}

Profil.getInitialProps = async({query:{person}}) =>{
  //fetch data on server
  //const pageProps = await Home.getInitialProps(ctx);
  const user1="profil";
  const url = `${baseUrl}/api/products`;
  const payload = {params:{user1,person}}
  const response = await axios.get(url,payload);
  return {products: response.data};
}

export default Profil;
