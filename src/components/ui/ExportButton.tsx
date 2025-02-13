import React from 'react'

const ExportButton = () =>{
  return (
    <button className="flex items-center justify-center p-[10px] space-x-2 rounded-[8px] bg-white border border-gray-300">
        <img src="/assets/icons/export.png" alt="filter-lines" />
        <span>Export</span>
    </button>
  )
}


export default ExportButton;