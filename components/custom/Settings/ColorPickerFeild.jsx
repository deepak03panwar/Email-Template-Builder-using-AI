import React from 'react'

function ColorPickerFeild({label,value,onHandleStyleChange}) {
  return (
    <div className='grid'>
      <div> <label>{label}</label> </div>
        
        <input type='color' value={value} 
        onChange={(e)=>onHandleStyleChange(e.target.value)
            

        }

        
        />
    </div>
  )
}

export default ColorPickerFeild