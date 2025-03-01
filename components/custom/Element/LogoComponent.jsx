import React from 'react'

function LogoComponent({style,content,outerstyle}) {
  return (
    <div style={outerstyle}>
        <img src={content}  priority="true" alt="Logo" style={style} />
    </div>
  )
}

export default LogoComponent