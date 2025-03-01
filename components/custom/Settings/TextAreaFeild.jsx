import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function TextAreaFeild({label,value,onHandleInputChange}) {
  return (
    <div>
        <label>{label}</label>
        <Textarea  value={value} onChange={(e)=>onHandleInputChange(e.target.value)}/>
    </div>
  )
}

export default TextAreaFeild