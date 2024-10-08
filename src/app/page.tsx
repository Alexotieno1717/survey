"use client"

import SurveyList from '@/components/survey/surveyList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CreateSurvey() {

  return (
    <>
      <div className='px-2 md:px-14 pt-12'>
          <div className='space-y-6'>
            <div>
              <h2 className='text-2xl font-bold'>Survey</h2>
              <p className='text-gray-400 text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <hr  />
          </div>

          <div className='pt-12'>
            <div className="flex items-center justify-between">
              <h2 className='text-xl md:text-2xl font-bold text-center'>Survey Created</h2>
              <Link href='/dashboard/survey/create'>
                <button className='flex gap-2 px-4 md:px-6 py-2 md:py-3 text-white rounded-lg bg-survey-green'>
                  <PlusCircleIcon className='h-6 w-6' />
                  Create Survey
                </button>
              </Link>
            </div>

            <div>
              <SurveyList />
            </div>
          </div>
      </div>
    </>
  );
}
