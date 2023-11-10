import React  from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addToHistory, deleteVideo } from '../services/allAPI';


function Videocard({displayVideo,setDeleteVideoStatus}) {
  const [show,setShow]= useState(false);
  const handleClose = ()=> setShow(false);
  const handleShow = async()=> {
    setShow(true)

    const {caption , embedLink} = displayVideo
    const today = new Date
    // console.log(today);
    let timeStamp = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month:'2-digit',
      day: '2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'
    }).format(today)
    console.log(timeStamp);

    let videoDetails = {
      caption,
      embedLink,
      timeStamp
    }
  
    await addToHistory(videoDetails)
}


  const removeVideo = async(id)=>{
     const response = await deleteVideo(id)
     console.log(response);
     setDeleteVideoStatus(true)

  }
  const dragStated = (e,id)=>{
    console.log(`card no:${id} started dragging`);
    e.dataTransfer.setData("videoID",id)
    // console.log(e);
    
  }

  return (
    <>
    
        <Card  style={{ width: '100%' , height:'300px' }} className='mb-4' draggable onDragStart={(e)=>dragStated(e,displayVideo?.id)}>
        <Card.Img height={'200px'} onClick={handleShow}  variant="top" src={displayVideo.url}/>
        <Card.Body>
            <h5>{displayVideo.caption}</h5>
            <button onClick={()=>removeVideo(displayVideo?.id)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
            <Card.Text>
           
            </Card.Text>
        </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{displayVideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="530" src={`${displayVideo.embedLink}?autoplay=1`} title={displayVideo.caption} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
        
      </Modal>

      </>


    
  )
}

export default Videocard
