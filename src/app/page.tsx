"use client"

import SurveyList from '@/components/survey/surveyList';
import {
  ArrowTrendingUpIcon,
  ClipboardDocumentListIcon, PencilIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import HeaderCards from "@/components/headerCards";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/solid";
import React from "react";
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import HomeSurveysCards from "@/components/home/homeSurveysCards";

export default function CreateSurvey() {

  const headerCardsContents = [
    {
      'icon': <ClipboardDocumentCheckIcon className='w-6 h-6' />,
      'title': 'Total Survey',
      'totalNumber': '50',
    },
    {
      'icon': <ClipboardDocumentListIcon className='w-6 h-6' />,
      'title': 'Survey Responses',
      'totalNumber': '150',
    },
    {
      'icon': <ArrowTrendingUpIcon className='w-6 h-6' />,
      'title': 'Completed Survey',
      'totalNumber': '350',
    },
  ]

  return (
    <>
      <div className='px-2 md:px-14 pt-12'>

        <h1 className='text-3xl font-bold pb-4'>Analytic Insight</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {headerCardsContents.map((item, index) => (
              <HeaderCards
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  totalNumber={item.totalNumber}
              />
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-12'>

          {/* View   */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className='text-xl md:text-2xl font-bold text-center'>Recent Surveys</h2>
              <Link href='/dashboard/survey'>
                <button className='flex gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg text-survey-green hover:underline'>
                  View all Survey
                  <ArrowRightCircleIcon className='h-6 w-6'/>
                </button>
              </Link>
            </div>

            <div className=' bg-white shadow border rounded-lg border-gray-50 py-6 px-4 space-y-6'>
              {Array.from({ length: 5 }).map((_, i) => (
                  <HomeSurveysCards key={i} />
              ))}
            </div>

          </div>

          {/* Recent Created survey */}
          <div>
            <div>
              <div className="flex items-center mb-6">
                <h2 className='text-xl md:text-2xl font-bold text-center'>Survey - Questions</h2>
              </div>
            </div>

            <div className="p-2 md:p-3 mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-1 md:space-y-0">
                <div>
                  <p className='hidden md:block text-sm text-gray-400 pb-0 md:pb-6'>Survey title</p>
                  <h4 className="text-sm  md:text-lg font-semibold flex space-x-4"><span>Customer Satisfaction Survey 2024</span>
                    <PencilSquareIcon className='w-5 h-5 text-survey-green'/></h4>
                </div>
                <div className='flex flex-row space-x-2 md:space-x-0 md:flex-col'>
                  <p className='text-sm text-gray-400 pb-0 md:pb-6'>Question</p>
                  <span className='px-2 md:px-3 py-1 rounded-full text-xs'>5</span>
                </div>
                <div className='flex flex-row space-x-2 md:space-x-0 md:flex-col'>
                  <p className='text-sm text-gray-400 pb-0 md:pb-6'>Total responses:</p>
                  <span className="text-gray-600 text-sm">  3</span>
                </div>
                <div className='hidden md:block'>
                  <p className='text-sm text-gray-400 pb-0 md:pb-6'>Date</p>
                  <span className="text-gray-400 text-sm">3-01-2024</span>
                </div>
              </div>
            </div>

            <div className='p-2 md:p-8 mb-4 rounded-lg border border-gray-100  space-y-6'>

              <h4>Question (5)</h4>

              <div className=' space-y-6'>
                <div className='flex flex-col md:flex-row justify-between'>
                  <h2>1. How Satisfied are you with our product?</h2>
                  <div className='flex pt-4 md:pt-0 space-x-3'>
                    <p className='px-2 md:px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-800'>single choice</p>
                    <PencilSquareIcon className='w-5 h-5 text-survey-green'/>
                    <TrashIcon className='w-5 h-5 text-red-500'/>
                  </div>
                </div>
                <hr/>
              </div>

              <div className=' space-y-6'>
                <div className='flex flex-col md:flex-row justify-between'>
                  <h2>2. How likely are you to recommend our product/service to others?</h2>
                  <div className='flex pt-4 md:pt-0 space-x-3'>
                    <p className='px-2 md:px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-800'>Multiple
                      choice</p>
                    <PencilSquareIcon className='w-5 h-5 text-survey-green'/>
                    <TrashIcon className='w-5 h-5 text-red-500'/>
                  </div>
                </div>
                <hr/>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}
