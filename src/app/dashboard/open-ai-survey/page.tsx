"use client"

import {useEffect, useState} from "react";
import SurveyModal from "@/components/survey/SurveyModal";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Disclosure} from "@headlessui/react";
import clsx from "clsx";
import {ChevronDownIcon} from "@heroicons/react/16/solid";

interface ContentProps {
    question: string;
    answer: string;
}

interface OpenAiSurveyProps {
    active: boolean;
    content: ContentProps[];
    title: string;
}

const OpenAiSurvey = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<OpenAiSurveyProps[]>([]); // Update type to an array of OpenAiSurveyProps

    const fetchOpenAISurvey = async () => {
        try {
            const response = await fetch("/api/getfaqs");

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const fetchedData = await response.json();
            setData(fetchedData); // Ensure `fetchedData` is an array of OpenAiSurveyProps
            console.log("Fetched FAQs:", fetchedData);
        } catch (error) {
            console.error("Error fetching OpenAI survey FAQs:", error);
        }
    };

    useEffect(() => {
        fetchOpenAISurvey();
    }, []);

    return (
        <>
            <SurveyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="px-4 md:px-14 pt-12">
                <div className="flex justify-end pb-10">
                    <button
                        className="flex gap-2 px-4 md:px-6 py-2 md:py-3 text-white rounded-lg bg-survey-green"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <PlusCircleIcon className="h-6 w-6" />
                        Create Survey With AI
                    </button>
                </div>

                <hr className="pb-10" />

                {data.map((section) => (
                    <Disclosure key={section.title}>
                        {({ open }) => (
                            <div className="bg-white rounded-lg shadow-md p-2 md:p-3 border border-gray-100 mb-8">
                                <Disclosure.Button className="flex items-center justify-between w-full">
                                    <div className="flex space-x-3">
                                        <h1 className="text-left text-lg font-bold text-gray-900">
                                            {section.title}
                                        </h1>
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

                                <Disclosure.Panel className="mt-4">
                                    <div className="space-y-6">
                                        {section.content.map((item) => (
                                            <Disclosure key={item.question}>
                                                {({ open }) => (
                                                    <div className="border-b pb-4">
                                                        <Disclosure.Button
                                                            className="flex items-center justify-between w-full text-left text-base font-medium text-gray-900"
                                                        >
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

                                        <div className="flex justify-end">
                                            {section.active ? (
                                                <button className="px-4 py-2 text-white rounded-lg bg-red-500">
                                                    Deactivate
                                                </button>
                                            ) : (
                                                <button className="px-4 py-2 text-white rounded-lg bg-survey-green">
                                                    Activate
                                                </button>
                                            )}
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
