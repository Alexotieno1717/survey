import React, {ReactNode} from 'react';
import Link from "next/link";
import {ArrowRightIcon} from "@heroicons/react/24/outline";

interface headerCardsProps {
    icon: ReactNode;
    title: string;
    totalNumber: string;
}

const HeaderCards = ({icon, title, totalNumber}: headerCardsProps) => {
    return (
        <>
            <div className='flex space-x-6 bg-white rounded-lg shadow-sm border py-4 px-6'>
                <div className='my-6 bg-survey-green/90 rounded-full w-10 h-10 flex items-center justify-center text-white'>
                    {icon}
                </div>
                <div>
                    <h2 className='text-sm'>{title}</h2>
                    <h3 className='text-4xl font-bold'>{totalNumber}</h3>
                    <Link className='flex items-center justify-center gap-2 text-survey-green text-xs pt-2' href='/dashboard/survey'><span>view all survey</span> <ArrowRightIcon className='w-4 h-4' /> </Link>
                </div>
            </div>
        </>
    );
};

export default HeaderCards;