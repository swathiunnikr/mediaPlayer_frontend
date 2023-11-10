import React, { useState } from 'react'
import Add from '../components/Add'
import View from '../components/View'
import Category from '../components/Category'


function Home() {
  const [uploadVideoStatus , setUploadVideoStatus] = useState({})

  return (
    <div className='mt-5 mb-5'>
      <div className='mt-3 mb-3 d-flex align-items-center justify-content-center  w-100'>

      <Add setUploadVideoStatus={setUploadVideoStatus}/>
      </div>
      <div className='container-fluid d-flex justify-content-between'>
      <View uploadVideoStatus={uploadVideoStatus}/>
      <div className="category col-lg-3">
      <Category/>

      </div>
    </div>
    </div>
  )
}

export default Home
