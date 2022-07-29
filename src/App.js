import { Input, Form, FormGroup, Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import React from 'react';
import "./App.css";
import useCollegeList from './custom.js';
import axiosDeneme from './axios';
import { useState } from 'react';
import axiosDelete from './delete..js';
import putaxios from './putaxios';
import useCommentList from './yorumCrud';

function App(){
  const { hotelList, deleteAction, updateAction, postAction, detaylist, detayGetir } = useCollegeList();
  const { comments, commentPost,commentDelete ,commentGetir ,commentTek } = useCommentList();
  const [postatma, setPostAtma] = useState({});
  const [detayId, setDetayId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  

  const handleChange = ({e, name, value }) => {
    setPostAtma({ ...postatma, [name]: value });
    
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();
    if (postatma["name"] !== undefined && postatma["city"] !== undefined && postatma["name"].length !== 0 && postatma["city"].length !== 0) {


      const updateData = await axiosDeneme(postatma);
      e.preventDefault();
      postAction(updateData);
      
      setPostAtma({});
    } else {
      alert("lütfen şehir isim giriniz!")
    }

  };
  const commentAtma = async (e, id) => {
    e.preventDefault();
    if (postatma[`yorum-${id}`] !== undefined && postatma[`yorum-${id}`].length !== 0) {
     console.log("burda", postatma)
      // Object.assign(postatma, { otelId: e.target.id });
      const reqobje= {
        otelId:e.target.id,
        yorum:postatma[`yorum-${id}`]
      }
     await commentPost(reqobje);
      setPostAtma({});
      
    }
    else

      alert("lütfen yorum giriniz!")
  };


const guncelle = async (e, id) => {
  Object.assign(postatma, { id: e.target.id });

  if (postatma["name"] !== undefined && postatma["city"] !== undefined && postatma["name"].length !== 0 && postatma["city"].length !== 0) {

    Object.assign(postatma, { id: e.target.id });
    const responsedata = await putaxios(postatma);
    updateAction(responsedata);
    setPostAtma({});
  } else {
    alert("lütfen şehir isim giriniz!")
  }
};

const handleDelete = async (e) => {
  const id = e.target.id;
  await axiosDelete(id);
  deleteAction(id);
  commentDelete(id);
};
const detaylandir = async (e) => {
  e.preventDefault();
  const id = e.target.id;
  await detayGetir(id);
  setDetayId(id);
  commentGetir(id);
  setShow(true);

};

console.log("yorum",comments);

return (
  <div>
    <h1>Oteller</h1>
    <Form >
      <FormGroup className='ilk'>

        <Input

          name='name'
          onChange={({ target }) => handleChange(target)}
          placeholder="Hotel Adı"
          value={postatma["name"] ?? ""}
        />
        <Input

          name='city'
          onChange={({ target }) => handleChange(target)}
          placeholder="Bulunduğu şehir"
          value={postatma["city"] ?? ""}
        />
        <button onClick={handleSubmmit} >
          Ekle
        </button>

        <ul>
          {
            hotelList.map(({ id, name, city }) => {
              return (
                <li key={id}>
                  <span><strong>ID:</strong> {id}</span>
                  <span><strong>&emsp; Hotel Name:</strong> {name}</span>
                  <span><strong> &emsp; City:</strong> {city}</span>
                  <br />
                  <Input
                    onChange={({ target }) => handleChange(target)}
                    name={`yorum-${id}`}
                    placeholder="Yorumunuz"
                    id={id}
                    value={postatma[`yorum-${id}`] ?? ""}
                  /> <button id={id} onClick={(e)=>commentAtma(e,id)}   >Yorum Ekle</button>
                  <br />
                  <button id={id} onClick={handleDelete}> Sil</button>
                  <button
                    id={id} onClick={guncelle} >Güncelle</button>
                  <button id={id} onClick={detaylandir}>Detay </button>
                </li>
              );
            })
          }
        </ul>
      </FormGroup>
      <FormGroup className='details'>
        <Modal 
          className='deneme'
          isOpen={show} onHide={handleClose}>
          <ModalHeader >
            {detaylist.name}
          </ModalHeader>
          <ModalBody>
          <li >Bulunduğu konum :{detaylist.city}</li>
           {commentTek.map(({yorum, otelId})=>{
            
              return <li key={otelId} >{yorum} </li>
        }
        )}</ModalBody>
         
          <ModalFooter>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </FormGroup>
    </Form>

  </div>
);

};

export default App;
