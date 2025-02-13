import React from 'react'
import FilterButton from './FilterButton';

interface HeaderWithButtonProps{
    title: string;
    showButton?: boolean;
}

export default function HeaderWithButton({ title, showButton = false}: HeaderWithButtonProps) {
  return (
    <div className="flex justify-between">
      <h1 className="font-semibold text-4xl text-[#171725] leading-10">{title}</h1>
      {showButton && <FilterButton color='blue' />}
    </div>
  )
}
