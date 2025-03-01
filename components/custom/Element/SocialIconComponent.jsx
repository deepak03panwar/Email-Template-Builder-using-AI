import React from "react";

function SocialIconComponent({ style, outerStyle, socialIcons }) {
  return (
    <div style={outerStyle}>
      {socialIcons?.map((iconObj, index) => (
        <a 
          key={index} 
          href={iconObj.url || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!iconObj.url) e.preventDefault(); // Prevents navigation if URL is empty
          }}
          style={{ display: "inline-block", cursor: "pointer" }}
        >
          <img 
            src={iconObj.icon} 
            alt={`Social icon ${index + 1}`} 
            style={style} 
          />
        </a>
      ))}
    </div>
  );
}

export default SocialIconComponent;
