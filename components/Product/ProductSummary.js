import Link from 'next/link';

function ProductSummary({product}) {
  const personhref=`/person?person=${product.person}`
  const imageList=product.mediaUrl;

  return (
    <>
      <div className="productContainer">

        <div className="productImage">
        {imageList.map((value, index) => {
          return(
              <img src={value} width="100%" key={index}/>
          )
        })}
        </div>
        <div className="productInfo">
        <h3>{product.titel}</h3>
        <p>{product.description}</p>
        <Link href={personhref}>
        <h4 className="highlight" >&rarr; Person {product.person}</h4>
        </Link>
        </div>

      </div>
    </>
  );
}

export default ProductSummary;
