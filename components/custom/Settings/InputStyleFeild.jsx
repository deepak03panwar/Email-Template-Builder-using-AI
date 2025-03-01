import React from 'react';

function InputStyleField({ label, value, onHandleStyleChange,type='px' }) {
  const formattedValue = (value) => {
    return Number(value.toString().replace(type,''));
  }

  return (
    <div >
      <label>{label}</label>
      <div className='flex'>
      <input
        type="text"
        value={formattedValue(value)}
        onChange={(e) => onHandleStyleChange(e.target.value+type)}
      />
      <h2 className='p-1 bg-gray-100 rounded-r-lg ml-0'>{type}</h2>
      </div>
      
    </div>
  );
}

export default InputStyleField;
