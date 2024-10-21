import {Button, Form, Header, Message} from 'semantic-ui-react';
import React from 'react';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import {handleLogin} from '../utils/auth';

const initialUser = {
  name:"",
  password:""
}

function Signup() {
  const [user, setUser] = React.useState(initialUser);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(()=>{
    const isUser = Object.values(user).every(el=>Boolean(el))
    isUser ? setDisabled(false):setDisabled(true);
  },[user])

  function handleChange(event){
    const{name, value} = event.target
    setUser(prevState=>({...prevState,[name]:value}))
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      setError('');
      setLoading(true);
      const url = `${baseUrl}/api/login`
      const payload = {...user}
      const response = await axios.post(url,payload)
      handleLogin(response.data)
    }catch(error){
      catchErrors(error, setError);
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
    <Header>login</Header>
    <Form loading={loading}
        onSubmit={handleSubmit}
        error={Boolean(error)}>
      <Message
        error
        content={error}
      />
        <Form.Input
          label="name"
          name="name"
          onChange={handleChange}
          value={user.name}/>
        <Form.Input
          type="password"
          label="password"
          name="password"
          onChange={handleChange}
          value={user.password}/>
        <Button
          type="submit"
          content="login"
          disabled={disabled || loading}/>
    </Form>
    </>
  );
}

export default Signup;
