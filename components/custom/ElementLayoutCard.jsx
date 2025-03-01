import React from 'react'

function ElementLayoutCard({layout}) {
  return (
    
        <div

            className='flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-3 text-center group hover:shadow-md hover:border-primary cursor-pointer'
          >
            {layout.icon && <layout.icon  className='p-2 h-9 w-9 bg-gray-100 group-hover:text-primary group-hover:bg-purple-100 rounded-full'/>} {/* Ensure layout.icon is defined */}
            <h2 className='text-sm group-hover:text-primary'>{layout.label}</h2>
          </div>

  )
}

export default ElementLayoutCard