"use client"

import { Button } from '@/components/ui/button';
import HeaderWithButton from '@/components/ui/HeaderWithButton'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from 'next/navigation';
import React from 'react'
import * as Yup from "yup";


interface ValuesProps {
	question: string;
	surveyId: string;
	questionOrder: string;
	answerType: string;
	violationResponse: string;
}

const validationSchema = Yup.object({
	question: Yup.string().required("Question is required"),
	surveyId: Yup.string().required("Survey ID is required"),
	questionOrder: Yup.string().required("Service is required"),
	answerType: Yup.string().required("Answer Type is required"),
	violationResponse: Yup.string().required("Violation Response is required"),
});

export default function SurveyEdit() {


	const router = useRouter();

    const handleSubmit = (values: ValuesProps) => {
        console.log("cosoling values")
		console.log(values);
	};


  return (
    <div className="pt-8 mt-12 space-y-4 md:p-4">
      <HeaderWithButton title="Survey Edit" showButton={false} />

        <div className='bg-white rounded-[8px] p-10'>
            <Formik<ValuesProps>
                initialValues={{
                    question: "",
                    surveyId: "",
                    questionOrder: "",
                    answerType: "",
                    violationResponse: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values,  }) => (
                    <Form className='space-y-6'>
                        <div className="space-y-[6px]">
                            <label className="text-sm text">Question</label>
                            <Field
                                as="textarea"
                                name="question"
                                placeholder="Enter Question ..."
                                cols={30}
                                rows={5}
                                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="question"
                                component="div"
                                className="text-sm text-red-600"
                            />
                        </div>
                        <div className="space-y-[6px]">
                            <label className="text-sm text">answerType</label>
                            <Field
                                as="textarea"
                                name="answerType"
                                placeholder="Enter Answer Type ..."
                                className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="answerType"
                                component="div"
                                className="text-sm text-red-600"
                            />
                        </div>
                        <div className="space-y-[6px]">
                            <label className="text-sm font-medium">Survey ID</label>
                            <Field
                                as="select"
                                name="surveyId"
                                className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">test survey</option>
                                <option value="1">survey 2</option>
                                <option value="2">monday meeting</option>
                                <option value="3">hello</option>
                            </Field>
                            <ErrorMessage
                                name="clientId"
                                component="div"
                                className="text-sm text-red-600"
                            />
                        </div>
                        <div className="space-y-[6px]">
                            <label className="text-sm text">Question Order</label>
                            <Field
                                type="text"
                                name="questionOrder"
                                placeholder="Enter client name..."
                                className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="questionOrder"
                                component="div"
                                className="text-sm text-red-600"
                            />
                        </div>
                        <div className="space-y-[13px]">
                            <div className="space-y-[6px]">
                                <label className="text-sm font-medium">
                                    Select Answer Data Type (Optional)
                                </label>
                                <Field
                                    as="select"
                                    name="violationResponse"
                                    className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select Data Type</option>
                                    <option value="1">Alphanumeric</option>
                                    <option value="2">Strictly Number</option>
                                </Field>
                                <ErrorMessage
                                    name="violationResponse"
                                    component="div"
                                    className="text-sm text-red-600"
                                />
                            </div>
                        </div>
                        <hr className="mt-6" />
                        <div className="flex items-end justify-end pt-[17px] space-x-3">
                        <Button variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit">Edit Question</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}
