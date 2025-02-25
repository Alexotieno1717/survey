"use client"

import { Button } from '@/components/ui/button'
import HeaderWithButton from '@/components/ui/HeaderWithButton'
import React from 'react'
import { useRouter } from 'next/navigation';


const SurveyView = () =>{
  const router = useRouter();
  return (
    <div className="pt-8 mt-12 space-y-4 md:p-4">
      <HeaderWithButton title="Contact Group Maps View" showButton={true} />

        <div className='bg-white rounded-[8px] space-y-5 p-10 border border-gray-100'>
            <h2><b>Group</b> : #OTM</h2>
            <h2><b>Phone Number</b> : 0748815593</h2>
            <h2><b>Status</b> : ACTIVE</h2>
            <h2><b>inserted at</b> : 2024-09-24 12:11:11</h2>
            <hr className="mt-6" />
            <div className="flex items-end justify-end pt-[17px] space-x-3">
              <Button variant="outline" onClick={() => router.back()}>
                  Back to Contact
              </Button>
            </div>
        </div>
    </div>
  )
}

export default SurveyView