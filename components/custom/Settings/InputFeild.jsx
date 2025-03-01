import React from 'react';

function InputField({ label, value, onHandleInputChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ marginBottom: '5px' }}>{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(event) => onHandleInputChange(event.target.value)} 
        style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </div>
  );
}

export default InputField;
