import baseUrl from "../utils/baseUrl";
import axios from 'axios';
import Link from 'next/link';

function Person({products}) {

  return(
    <>

    <div className="profilInfo">
      <p className="profilHighlight">Person {products[0].person}, {products.length} Entries</p>
    </div>

    <div className="profilContainer">
      {products.map((value) => {
        return(
          <Link href={`/product?_id=${value._id}`} key={value._id}>
          <div className="profilCard">
            <img src={value.mediaUrl[0]} width="100%"/>
            <div className="profilCardTitel">
            <p>{value.titel}<span className="highlight">&rarr;</span></p>
            </div>
          </div>
          </Link>
        )
      })}
    </div>

    </>
  );
}

Person.getInitialProps = async({query:{person}}) =>{
  //fetch data on server
  //const pageProps = await Home.getInitialProps(ctx);
  const user1='profil';
  const url = `${baseUrl}/api/products`;
  const payload = {params:{user1,person}}
  const response = await axios.get(url,payload);
  return {products: response.data};
}

export default Person;
