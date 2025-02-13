import React from 'react'

interface OverviewCardsProps{
    img: string;
    title: string;
    description: string;
}
const OverviewCards = ({img, title, description}: OverviewCardsProps) =>{
  return (
    <div className="flex flex-col md:flex-row  justify-start rounded-[10px] bg-[rgba(220,241,254,100%)] px-3 md:px-6 py-5 gap-x-5">
        <img src={img} className='w-[76px] h-[76px]' alt={`logo showcasing ${title}`}/>
        <div className="space-y-2">
            <h2 className="font-bold  text-xl text-[#171725] pt-5 md:pt-0">{title}</h2>
            <p className="font-normal text-xs text-[#344054]">{description}</p>
        </div>
    </div>
  )
}


export default OverviewCards;