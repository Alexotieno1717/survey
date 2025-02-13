import React from 'react'

export default function CustomLegend() {
  return (
    <div className="flex space-x-[13px] text-gray-600 pt-5 md:pt-0">
		{/* TODO Make the div wrapped in flex items-center to be a component*/}
		<div className="flex items-center">
		  <div className="w-3 h-3 mr-2 rounded-full bg-[#50B5FF]"/>
		  <p>Messages Sent</p>
		</div>
		<div className="flex items-center">
		  <div className="w-3 h-3 mr-2 rounded-full bg-[#E3F6FF]"/>
		  <p>Messages Delivered</p>
		</div>
	</div>
  )
}
