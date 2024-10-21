import React from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import {Button, Modal} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import Link from 'next/link';

function ProductAttributes({_id,user}) {
  const [modal, setModal] = React.useState(false);
  const router = useRouter();
  const edithref=`/edit?_id=${_id}`

  async function handleDelete(){
      const url = `${baseUrl}/api/product`;
      const payload = {params:{_id}};
      await axios.delete(url, payload);
      router.push('/');
  }

  return(
    <>
      {user && (<>
        <Link href={edithref}>
        <Button
          icon="edit"
          color="blue"
          content="edit product"
          />
        </Link>
        <Button
          icon="trash"
          color="red"
          content="delete product"
          onClick={()=>setModal(true)}
          />
          </>)}
          <Modal open={modal} dimmer="blurring">
            <Modal.Header>confirm delete</Modal.Header>
            <Modal.Content>
            <p>are you sure you want to delete</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
              onClick={()=>setModal(false)}
              content="Cancel"/>
              <Button
                negative
                icon="trash"
                labelPosition="right"
                content="Delete"
                onClick={handleDelete}
                />
            </Modal.Actions>
          </Modal>
    </>
  );
}

export default ProductAttributes;
