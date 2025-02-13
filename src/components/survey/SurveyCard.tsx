import React from 'react';
import {PencilIcon, TrashIcon} from "lucide-react";

interface SurveyCardProps {
    title: string;
    status: 'Active' | 'Inactive' | 'Finished';
    responses: number;
    date: string;
}


const SurveyCard: React.FC<SurveyCardProps> = ({ title, status, responses, date }) => {

    const statusClasses: { [key in SurveyCardProps['status']]: string } = {
        Active: 'bg-green-200 text-green-800',
        Inactive: 'bg-orange-200 text-orange-800',
        Finished: 'bg-blue-200 text-blue-800'
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-2 md:p-3 mb-4 border border-gray-100">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-1 md:space-y-0">
                    <div>
                        <p className='hidden md:block text-sm text-gray-400 pb-0 md:pb-6'>Survey title</p>
                        <span className="text-sm  md:text-lg font-semibold">{title}</span>
                    </div>
                    <div className='flex flex-row space-x-2 md:space-x-0 md:flex-col'>
                        <p className='text-sm text-gray-400 pb-0 md:pb-6'>Status</p>
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs ${statusClasses[status]}`}>{status}</span>
                    </div>
                    <div className='flex flex-row space-x-2 md:space-x-0 md:flex-col'>
                        <p className='text-sm text-gray-400 pb-0 md:pb-6'>Total responses:</p>
                        <span className="text-gray-600 text-sm">  {responses}</span>
                    </div>
                    <div className='hidden md:block'>
                        <p className='text-sm text-gray-400 pb-0 md:pb-6'>Date</p>
                        <span className="text-gray-400 text-sm">{date}</span>
                    </div>
                    <div>
                        <span className="hidden md:block text-gray-400 text-sm">Actions</span>
                        <div className="flex md:justify-center space-x-3 mt-3 md:mt-6">
                            <button className="text-purple-600 hover:text-purple-800">
                                <PencilIcon className='w-6 h-6' />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                                <TrashIcon className='w-6 h-6' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default SurveyCard;
