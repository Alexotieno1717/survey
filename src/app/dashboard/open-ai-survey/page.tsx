"use client";

import React, {useEffect, useState} from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import SurveyModal from "@/components/survey/SurveyModal";

interface contentProps {
    questions: string;
    answer: string;
}

interface openAiSurveyProps {
    active : boolean;
    content : contentProps[];
    title : string
}
// const data = [
//     {
//         id: "1",
//         title: "AI Survey",
//         active: true,
//         content: [
//             {
//                 id: 1,
//                 questions: "What are the opening hours?",
//                 answers:
//                     "Opening Hours are weekdays from 8 a.m. to 5 p.m. and weekends from 10 a.m. to 4 p.m.",
//             },
//             {
//                 id: 2,
//                 questions: "Do you offer technical support?",
//                 answers: "Yes, we provide 24/7 technical support for all users.",
//             },
//             {
//                 id: 3,
//                 questions: "What is your refund policy?",
//                 answers:
//                     "Refunds are provided within 30 days of purchase, subject to terms and conditions.",
//             },
//             {
//                 id: 4,
//                 questions: "How can I contact customer service?",
//                 answers:
//                     "You can contact customer service via email at support@example.com or call us at +123-456-7890.",
//             },
//         ],
//     },
//     {
//         id: "2",
//         title: "Bonga SMS Survey",
//         active: false,
//         content: [
//             {
//                 id: 1,
//                 questions: "What are the opening hours?",
//                 answers:
//                     "Opening Hours are weekdays from 8 a.m. to 5 p.m. and weekends from 10 a.m. to 4 p.m.",
//             },
//             {
//                 id: 2,
//                 questions: "Do you offer technical support?",
//                 answers: "Yes, we provide 24/7 technical support for all users.",
//             },
//             {
//                 id: 3,
//                 questions: "What is your refund policy?",
//                 answers:
//                     "Refunds are provided within 30 days of purchase, subject to terms and conditions.",
//             },
//             {
//                 id: 4,
//                 questions: "How can I contact customer service?",
//                 answers:
//                     "You can contact customer service via email at support@example.com or call us at +123-456-7890.",
//             },
//             {
//                 id: 5,
//                 questions: "Are there any discounts available?",
//                 answers:
//                     "Yes, we offer discounts during special promotions. Subscribe to our newsletter to stay updated.",
//             },
//         ],
//     },
// ];

const OpenAiSurvey = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<openAiSurveyProps>([]);

    const fetchOpenAISurvey = async () => {
        try {
            const response = await fetch("/api/getfaqs");

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setData(data);
            console.log("Fetched FAQs:", data);
        } catch (error) {
            console.error("Error fetching OpenAI survey FAQs:", error);
        }
    };

    useEffect(() => {
        fetchOpenAISurvey();
    }, []);


    return (
        <>
            {/* Modal Component */}
            <SurveyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="px-4 md:px-14 pt-12">

                <div className='flex  justify-end pb-10'>
                    <button
                        className="flex gap-2 px-4 md:px-6 py-2 md:py-3 text-white rounded-lg bg-survey-green"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="h-6 w-6"/>
                        Create Survey With AI
                    </button>
                </div>

                <hr className='pb-10'/>

                {data.map((section) => (
                    <Disclosure key={section.title}>
                        {({open}) => (
                            <div className="bg-white rounded-lg shadow-md p-2 md:p-3 border border-gray-100 mb-8">
                            {/* Section Title */}
                                <Disclosure.Button className="flex items-center justify-between w-full">
                                    <div className='flex space-x-3'>
                                        <h1 className='text-left text-lg font-bold text-gray-900'>{section.title}</h1>
                                        <div
                                            className={clsx(
                                                "px-2 py-1 text-xs rounded-full text-center items-center justify-center",
                                                section.active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            )}
                                        >
                                            {section.active ? "Active" : "Inactive"}
                                        </div>
                                    </div>
                                    <ChevronDownIcon
                                        className={clsx(
                                            "w-5 transition-transform",
                                            open && "rotate-180"
                                        )}
                                    />
                                </Disclosure.Button>

                                {/* FAQs */}
                                <Disclosure.Panel className="mt-4">
                                    <div className="space-y-6">
                                        {section.content.map((item) => (
                                            <Disclosure key={item.question}>
                                                {({open}) => (
                                                    <div className="border-b pb-4">
                                                        <Disclosure.Button
                                                            className="flex items-center justify-between w-full text-left text-base font-medium text-gray-900">
                                                            {item.question}
                                                            <ChevronDownIcon
                                                                className={clsx(
                                                                    "w-5 transition-transform",
                                                                    open && "rotate-180"
                                                                )}
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="mt-2 pl-5 text-gray-500">
                                                            {item.answer}
                                                        </Disclosure.Panel>
                                                    </div>
                                                )}
                                            </Disclosure>
                                        ))}

                                        <div className='flex justify-end'>
                                            {section.active
                                                ?
                                                <>
                                                    <button
                                                        className='px-4 py-2 text-white rounded-lg bg-red-500'>Deactivate
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button
                                                        className='px-4 py-2 text-white rounded-lg bg-survey-green'>Activate
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                ))}
            </div>
        </>
    );
};

export default OpenAiSurvey;
