"use client"

import SurveyList from '@/components/survey/surveyList';
import {
  ArrowTrendingUpIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import HeaderCards from "@/components/headerCards";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/solid";
import React from "react";

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
