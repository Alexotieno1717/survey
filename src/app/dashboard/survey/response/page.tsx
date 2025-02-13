import CustomizeButton from '@/components/ui/CustomizeButton'
import ExportButton from '@/components/ui/ExportButton'
import FilterButton from '@/components/ui/FilterButton'
import HeaderWithButton from '@/components/ui/HeaderWithButton'
import React from 'react'
import SurveyList from "@/components/survey/SurveyList";



export default function SurveyResponse() {
  return (
    <div className="pt-8 mt-12 space-y-4 md:p-4">
        <HeaderWithButton title="Survey Responses" showButton={true} />
      <div className="bg-white rounded-lg py-4">
      <div className='p-6'>
        <div className='flex mb-6 space-x-4'>
          <div className="relative flex-grow">
            <input 
              type="text" 
              className="w-full px-10 py-3 border border-gray-300 rounded-[8px] shadow-sm text-gray-500 placeholder-gray-500 placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" 
              placeholder='Search' 
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
          </div>
          <FilterButton />
          <CustomizeButton />
          <ExportButton />
        </div>

          <div>
              <SurveyList />
          </div>
      </div>


      </div>
  </div>
  )
}
