import {Form,
        Input,
        TextArea,
        Button,
        Image,
        Message,
        Header,
        Modal,
        Checkbox} from 'semantic-ui-react';
import baseUrl from "../utils/baseUrl";
import axios from 'axios';
import React from 'react';
import catchErrors from '../utils/catchErrors';

function Edit({product}) {
    const [mediaPreview, setMediaPreview] = React.useState(product.mediaUrl);
    const [updatedProduct, setProduct] = React.useState(product);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    function handleChange(event){
      const {name, value, files} = event.target;
      if(name === 'media'){
        if(!files[0]){
          setProduct(prevState=>({...prevState, mediaUrl: []}))
          setMediaPreview([])
        }else{
          const newMedia=[]
          for(let i=0; i<files.length;i++){
            newMedia[i]=window.URL.createObjectURL(files[i])
          }
          setProduct(prevState=>({...prevState, mediaUrl: files}))
          setMediaPreview(newMedia)
        }
        }else{
        setProduct((prevState)=>({...prevState, [name]:value }));
        }
      }
      async function handleImageUpload(i){
        const data = new FormData()
        data.append('file', updatedProduct.mediaUrl[i])
        data.append('upload_preset','personendepot')
        const response = await axios.post(process.env.CLOUDINARY_URL,data)
        const updatedMediaUrl = response.data.url
        return updatedMediaUrl;
      }

      async function handleSubmit(event){
        try{
          event.preventDefault();
          setLoading(true);
          setError('');
          let updatedMediaUrl=[];
          if(updatedProduct.mediaUrl){
            for(let i=0;i<updatedProduct.mediaUrl.length;i++){
              updatedMediaUrl[i] = await handleImageUpload(i)
            }

          }
          const url = `${baseUrl}/api/product`
          const {status, description} = updatedProduct
          const _id= product._id
          const payload = {status, description,updatedMediaUrl,_id}
          const response = await axios.put(url, payload);

          //setModal(true);
        }catch(error){
          catchErrors(error,setError);
        } finally{
          setLoading(false);
        }
      }

  return (
    <Form
    loading={loading}
    error={Boolean(error)}
    onSubmit={handleSubmit}
    >
    <Header>Edit the contribution</Header>
    <Message
        error
        header="oops"
        content={error}
        />
      <Form.Field
          control={Input}
          name="media"
          label="media images"
          type="file"
          multiple
          accept="image/*"
          content="select image"
          onChange={handleChange}
        />
        <Image.Group>
        {mediaPreview.map((value) => {
          return <Image src={value} rounded centered size="small"/>
        })}
        </Image.Group>
      <Form.Field
          control={TextArea}
          name="description"
          label="description"
          type="text"
          value={updatedProduct.description}
          onChange={handleChange}
        />
        <Form.Field
            control={Input}
            name="status"
            label="put status online or offline"
            type="text"
            value={updatedProduct.status}
            onChange={handleChange}
          />
      <Form.Field
        control={Button}
        disabled={loading}
        color="blue"
        content="update"
        type="submit"
        />
    </Form>
  );
}

Edit.getInitialProps = async ({query:{_id}})=>{
  const url = `${baseUrl}/api/product`;
  const payload = {params:{_id}}
  const response = await axios.get(url,payload);
  return {product: response.data}
};

export default Edit;
