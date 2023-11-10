import React from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { uploadAllVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) {

   
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [video , setVideo] = useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""

   })
  //  console.log(video);


   const embedVideoLink = (e)=>{
   const {value} = e.target
   console.log(value.slice(-11));
   const link = `https://www.youtube.com/embed/${value.slice(-11)}`
   setVideo({...video,embedLink:link})

   }
   console.log(video);
   
   const handleUpload =async ()=>{
    const {id,caption,url,embedLink} = video
    if(!id || !caption || !url || !embedLink){
      toast.warning('please fill the form completely')
    }
    else{
       const response = await uploadAllVideo(video)
       console.log(response);
       if(response.status>=200 && response.status<300){
        toast.success(`${response.data.caption} is successfully Uploaded`)
        //to close the modal
        setUploadVideoStatus(response.data)
        handleClose()
       }
       else{
        console.log(response);
        toast.error('Something went wrong . Try again later')
       }
    }
   }

  return (
    <div className="d-flex upload-container container justify-content-between">
          <div className='d-flex gap-2'>
            <h5>Upload new video</h5>
            <button onClick={ handleShow}style={{background:'transparent',border:'none'}}><i class="fa-solid fa-cloud-arrow-up fa-2x" style={{color:'gold'}}></i></button>
          </div>
          <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film me-2 text-warning"></i>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>please fill the following details.</p>
         <form className='border border-secondary p-3 rounded'>

         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Video ID" onChange={(e)=>setVideo({...video,id:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Video Caption" onChange={(e)=>setVideo({...video,caption:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Video Image URL" onChange={(e)=>setVideo({...video,url:e.target.value})} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Youtube Video Link" onChange={embedVideoLink}  />
        </Form.Group>
         </form>




        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
          <div className=''>
            <Link style={{textDecoration:'none',color:'white'}} to={'/watch-history'}> <h5>Watch History</h5></Link>
          </div>
      </div>
  )
}

export default Add

//https://www.youtube.com/watch?v=szvt1vD0Uug

//https://www.youtube.com/embed/szvt1vD0Uug