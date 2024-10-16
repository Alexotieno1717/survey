import React from 'react';
import {ArrowRightCircleIcon} from "@heroicons/react/24/solid";

const HomeSurveysCards = () => {
    return (
        <>
            <div className="space-y-6">
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <div>
                        <h4 className="text-sm  md:text-lg font-semibold flex space-x-4"><span>Customer Satisfaction Survey 2024</span>
                        </h4>
                    </div>
                    <div className='flex pt-2 md:pt-0 space-x-2 md:space-x-4 text-center md:justify-center md:items-center'>
                        <p className='px-2 md:px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-800'>20 Responses</p>
                        <p className='px-2 md:px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-400'>single
                            choice</p>
                        <p className='flex justify-center items-center space-x-1 px-2 md:px-3 py-1 rounded-full text-xs bg-survey-green/20 text-survey-green/80'>
                            <span>View details</span> <ArrowRightCircleIcon className='w-4 h-4'/></p>
                    </div>
                </div>
                <hr/>
            </div>
        </>
    );
};

export default HomeSurveysCards;