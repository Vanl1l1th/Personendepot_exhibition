import Link from 'next/link';


function ProductList({products, user}) {
  const entries= products.length;

  let products0=[]
  let products1=[]
  let products2=[]
  let products3=[]
  let products4=[]

splitProducts()

  function splitProducts(){

    let counter=0;
    for(let i=0; i<products.length;i++){
      if(counter===0){
        counter=1;
        products0.push(products[i])

      }else if(counter===1){
        counter=2;
        products1.push(products[i])

      }else if(counter===2){
        counter=3;
        products2.push(products[i])

      }else if(counter === 3){
        counter=4;
        products3.push(products[i])
      }else if(counter === 4){
        counter=0;
        products4.push(products[i])
      }
    }
  }

  return (
    <>
    <div className="profilInfo">
    <p>{entries} Entries</p>
    </div>
    <div id="scroller"></div>
    <div className="collectionContainer">
    <div className="collectionColumn">
    {products0.map((value0) => {
      return(
        <Link href={`/product?_id=${value0._id}`} key={value0._id}>
        <div className="collectionCard">
          <img src={value0.mediaUrl[0]}  width="100%"/>
          <div className={value0.status+" profilCardTitel"}>
          <p>{value0.titel}<span className="highlight"> &rarr;</span></p>
          </div>
        </div>
        </Link>
      )
    })}
    </div>
    <div className="collectionColumn">
    {products1.map((value1) => {
      return(
        <Link href={`/product?_id=${value1._id}`} key={value1._id}>
        <div className="collectionCard" >
          <img src={value1.mediaUrl[0]} className={value1.status} width="100%"/>
          <div className={value1.status+" profilCardTitel"}>
          <p>{value1.titel}<span className="highlight"> &rarr;</span></p>
          </div>
        </div>
        </Link>
      )
    })}
    </div>
    <div className="collectionColumn">
    {products2.map((value2) => {
      return(
        <Link href={`/product?_id=${value2._id}`}key={value2._id}>
        <div className="collectionCard" >
          <img src={value2.mediaUrl[0]} className={value2.status} width="100%"/>
          <div className={value2.status+" profilCardTitel"}>
          <p>{value2.titel} <span className="highlight"> &rarr;</span></p>
          </div>
        </div>
        </Link>
      )
    })}
    </div>
    <div className="collectionColumn">
    {products3.map((value3) => {
      return(
        <Link href={`/product?_id=${value3._id}`}key={value3._id}>
        <div className="collectionCard" >
          <img src={value3.mediaUrl[0]} className={value3.status} width="100%"/>
          <div className={value3.status+" profilCardTitel"}>
          <p>{value3.titel}<span className="highlight"> &rarr;</span></p>
          </div>
        </div>
        </Link>
      )
    })}
    </div>
    <div className="collectionColumn">
    {products4.map((value4) => {
      return(
        <Link href={`/product?_id=${value4._id}`}key={value4._id}>
        <div className="collectionCard" >
          <img src={value4.mediaUrl[0]} className={value4.status} width="100%"/>
          <div className={value4.status+" profilCardTitel"}>
          <p>{value4.titel}<span className="highlight"> &rarr;</span></p>
          </div>
        </div>
        </Link>
      )
    })}
    </div>
    </div>
    </>
  );
}

export default ProductList;
