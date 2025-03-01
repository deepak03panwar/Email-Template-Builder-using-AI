import React from 'react'

function ImageComponent({style,imageUrl,outerstyle}) {
  return (
    <div style={outerstyle}>
        <img src={imageUrl} alt='image' style={style}/>
       
    </div>
  )
}

export default ImageComponent