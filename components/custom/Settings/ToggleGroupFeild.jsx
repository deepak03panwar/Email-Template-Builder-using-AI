import React from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

function ToggleGroupFeild({ label, value, options, onHandleStyleChange }) {
  return (
    <div>
      <label>{label}</label>
      <ToggleGroup 
        type="single"
        value={value}  // Ensure controlled component
        onValueChange={(v) => v && onHandleStyleChange(v)}  // Ensure v is not undefined
      >
        {options.map((option, index) => (
          <ToggleGroupItem 
            key={index} 
            value={option.value} 
            className="w-full"
          >
            {React.createElement(option.icon)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export default ToggleGroupFeild
