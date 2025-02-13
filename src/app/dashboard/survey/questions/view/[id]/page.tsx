"use client"

import { Button } from '@/components/ui/button'
import HeaderWithButton from '@/components/ui/HeaderWithButton'
import React from 'react'
import { useRouter } from 'next/navigation';


const SurveyView = () =>{
  const router = useRouter();
  return (
    <div className="pt-8 mt-12 space-y-4 md:p-4">
      <HeaderWithButton title="Survey View" showButton={true} />

        <div className='bg-white rounded-[8px] space-y-5 p-10 border border-gray-100'>
            <h2><b>Question</b> : Rate Our Services at Zero Cost Free?</h2>
            <h2><b>Question ID</b> : 3456</h2>
            <h2><b>Title</b> : From a range of 1-10 to how would you recommend our services to your peers.</h2>
            <h2><b>Question Order</b> : 1</h2>
            <hr className="mt-6" />
            <div className="flex items-end justify-end pt-[17px] space-x-3">
              <Button variant="outline" onClick={() => router.back()}>
                  Back to Survey
              </Button>
            </div>
        </div>
    </div>
  )
}

export default SurveyView