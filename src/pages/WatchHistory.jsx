import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteHistory, getAllHistory } from '../services/allAPI'

function WatchHistory() {

  const [history , setHistory] = useState([])

  const getHistory = async()=>{
    const {data} = await getAllHistory()
    // console.log(data);
    setHistory(data)
  }
  console.log(history);

  //function to delete history
  const handleDelete = async(id)=>{
    await deleteHistory(id)
    getHistory()
  }

  useEffect(()=>{
  getHistory()
  },[])
  

  return (
    <div className='container mt-5 mb-5'>
      <div className='d-flex justify-content-between'>
        <h2>Watch Hsitory</h2>
        <div className='d-flex align-items-center justify-content-center'><Link style={{textDecoration:'none',color:'white',fontSize:'20px'}} to={'/home'}><i class="fa-solid fa-arrow-right fa-rotate-180" style={{color:'white'}}></i> Back to home</Link></div>
      </div>
      <div className='table-container p-4'>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Caption</th>
              <th>URL</th>
              <th>Time Stamp</th>
            </tr>  
          </thead>
            <tbody>
           {history.length>0? 
            history.map((item)=>(<tr>
             <td>{item.id}</td>
              <td>{item.caption}</td>
              <td> <a href={item.embedLink} target='_blank'>{item.embedLink}</a> </td>
              <td>{item.timeStamp}</td>
              <td><button onClick={()=>handleDelete(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button></td>
            </tr>))
              :
            <p>Nothing to Display</p>
            }
            </tbody>
            
        </Table>
      </div>
    </div>
  )
}

export default WatchHistory
