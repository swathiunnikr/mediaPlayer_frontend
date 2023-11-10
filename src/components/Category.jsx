import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { addToCategories, getAllcategory, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAVideo } from '../services/allAPI';
import {Row , Col} from 'react-bootstrap';
import VideoCard from './Videocard';


function Category() {
  const [allCategory, setAllCategory] = useState([])

  const [categoryName , setCategoryName] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//function to add category
const handleAddCategory = async()=>{
  console.log(categoryName);
  if(categoryName){
    let body ={
      categoryName,
      allVideos:[]
    }
    //make api call
    const response = await addToCategories(body)
    console.log(response);
    if(response.status>=200 && response.status<300){
      toast.success('Category successfully Added')
      //to make the state null after successfull addition
      setCategoryName("")
      //to close modal
      handleClose()
    }
    else{
      console.log(response);
      toast.error('something went wrong. Please try again later')
    }
  }
  else{
    toast.warning('please fill the category Name')

  }

}

//function to get all category
const getallCategory = async()=>{
  const {data} = await getAllcategory()
  console.log(data);
  setAllCategory(data)
}
console.log(allCategory);

//dragover eventListener
const dragover = (e)=>{
  //this will prevent reload so that the data we send from videocard.jsx wont be lost
  e.preventDefault()
  console.log('inside dragover');
}
const videoDrop = async(e,categoryID)=>{
  console.log(`dropped inside the categoryid ${categoryID}`);
  //to get the videoid that is send  from videocard component
const videoid = e.dataTransfer.getData("videoID")
console.log(videoid);

//api to get the particular video that is dragged
const {data} = await getAVideo(videoid)
console.log(data);

//to find the particular category with the specified id
let selectedCategory = allCategory?.find(item=>item.id===categoryID)
console.log(selectedCategory);
//data is added to the allvideos array in the particular category with the specified id
selectedCategory.allVideos.push(data)
console.log(selectedCategory);

await updateCategory(categoryID,selectedCategory)
getAllcategory()
}

useEffect(()=>{
  getallCategory()
},[])

  return (
    <>
    <div className='d-grid ms-3'>
        <button onClick={handleShow} style={{width:'300px'}} className='btn btn-warning'>Add New Category</button>
    </div>


  {allCategory?.length>0?
  allCategory?.map((item)=>( <div className='m-5 border border-secondary rounded p-3 '>
  <div className="d-flex justify-content-between align-items-center" droppable onDragOver={(e)=>dragover(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
    <h6>{item.categoryName}</h6>
    <button className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
  </div>
  <Row>
    <Col sm ={12}>
      {
        item.allVideos?.length>0?
        item.allVideos.map(card=>(<VideoCard displayVideo={card} /> ))
        : <p>Nothing to display</p>
      }
    </Col>
  </Row>

</div>))
:
<p>Nothing to Display</p>
    }


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-pencil me-2 text-warning"></i>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <form className='border border-secondary p-3 rounded'>

         <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Category name " onChange={(e)=>setCategoryName(e.target.value)} />
        </Form.Group>


         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory} variant="warning">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>

      </>
    
  )
}

export default Category