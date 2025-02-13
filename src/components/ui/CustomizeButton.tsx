import React from 'react'

const CustomizeButton = () =>{
  return (
    <button className="flex items-center justify-center p-[10px] space-x-2 rounded-[8px] bg-white border border-gray-300">
        <img src="/assets/icons/customize.png" alt="filter-lines" />
        <span>Customize</span>
    </button>
  )
}


export default CustomizeButton;