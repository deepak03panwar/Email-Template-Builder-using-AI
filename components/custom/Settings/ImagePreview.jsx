import React from 'react'

function ImagePreview({label,value,onHandleInputChange}) {
  return (
    <div>
        <label>{label}</label>
        <img src={value} alt='Image' className='w-full h-[150px] object-cover border rounded-xl' />
         <input value={value} onChange={(e)=>onHandleInputChange(e.target.value)} className='mt-2'/>
        
    </div>
  )
}

export default ImagePreview