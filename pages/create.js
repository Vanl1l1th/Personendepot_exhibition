
import React from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import Guide from '../components/Create/Guide';
import Router from 'next/router';
import Link from 'next/link';

const initalProduct = {
  titel:"",
  media:[],
  description:"",
  filename:""
}

function CreateProduct({thekey}) {

  const [product, setProduct] = React.useState(initalProduct);
  const [mediaPreview, setMediaPreview] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState('');
  const [popUp, setPopUp] = React.useState(false);


  React.useEffect(()=>{
    if(product.description && product.titel){
      setDisabled(false);
    }
  },[product])

  function handleChange(event){
    const {name, value, files} = event.target;
    if(name === 'media'){
      if(!files[0]){
        setProduct(prevState=>({...prevState, media: "",filename:value}))
        setMediaPreview("")
      }else{
        const newMedia=[]
        for(let s=0; s<files.length;s++){
          newMedia[s]=window.URL.createObjectURL(files[s])
        }
        setProduct(prevState=>({...prevState, media: files,filename:value}))
        setMediaPreview(newMedia)
      }
      }else{
      setProduct((prevState)=>({...prevState, [name]:value }));
      }
    }

  async function handleImageUpload(i){
    const data = new FormData()
    data.append('file', product.media[i])
    data.append('upload_preset','personendepot')
    const response = await axios.post(process.env.CLOUDINARY_URL,data)
    const mediaUrl = response.data.url
    return mediaUrl;
  }

  async function handleSubmit(event){
    try{
      event.preventDefault();
      setLoading(true);
      setError('');
      let mediaUrl=[];
      if(product.media){
        for(let i=0;i<product.media.length;i++){
          mediaUrl[i] = await handleImageUpload(i)
        }

      }
      const url = `${baseUrl}/api/product`
      const {titel, description} = product
      const person = thekey.person;
      const payload = {person, titel, description, mediaUrl}
      const response = await axios.post(url, payload);
      setMediaPreview([])
      setProduct(initalProduct);
      setDisabled(true)
      //setPopUp
      setPopUp(true);
      //Router.push(`/profil?person=${thekey.person}`);
    }catch(error){
      catchErrors(error,setError);
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
    {popUp&& (
      <div className="createPopup">
      <p className="popUpTitel">Thank you for your submission!</p>
      <p>It may take some for your submission to go online.
      Add more personal detail on your profile.</p>
      <Link href={`/profil?person=${thekey.person}`}>
      <p className="highlight myProfile"> My profile &rarr;</p>
      </Link>
      </div>
    )}
    <Link href={`/profil?person=${thekey.person}`}>
    <h3 className="createClose">X</h3>
    </Link>
    <div className="createContainer">
      <p className="highlight newEntry">New Entry</p>

      <p  style={{color:"red"}}>{error}</p>

      {loading&& (
        <div className="createLoading">
        <h1>loading...</h1>
        </div>
      )}

      <div className="createSubcon createMedia" >

            <img src={mediaPreview[0]} whidth="100%" />


          <input className="imageInput" type="file" accept="image/*" name="media"  multiple value= {product.filename}
          onChange={handleChange}/>
        </div>

        <div className="createSubcon createText">
        <textarea className="createTitel" type="text" name="titel" value={product.titel} onChange={handleChange} placeholder="Titel that underlines your upload">
        </textarea>
        <textarea className="createDescription" name="description" value={product.description} onChange={handleChange} placeholder="Personal reference, describes your upload in a intimate way">
        </textarea>
        </div>
        {!loading&&(
            <p className="highlight upload" onClick={handleSubmit}>Upload &rarr;</p>
        )}


    </div>
    <Guide></Guide>
    </>
  );
}

export default CreateProduct;
