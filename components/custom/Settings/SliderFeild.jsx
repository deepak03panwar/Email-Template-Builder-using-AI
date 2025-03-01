import React from 'react'
import { Slider } from "@/components/ui/slider"


function SliderFeild({label,value,onHandleStyleChange,type='px'}) {

    const FormattedValue = (value) => {
        return Number(value.toString().replace(type,''));
      }

  return (
    <div>
        <label>{label}({value})</label>
        <Slider defaultValue={[FormattedValue(value)]} 
        max={100} step={1} 
        onValueChange={(v)=>onHandleStyleChange(v + type)}/>

    </div>
  )
}

export default SliderFeild