"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikTouched, FormikValues } from "formik";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MoveLeft, MoveRight, Trash2, TriangleAlert } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Transition } from "@headlessui/react";

interface Question {
    question: string;
    responseType: "free-text" | "multiple-choice";
    options: string[];
    allowMultiple?: boolean;
    freeTextDescription?: string;
    nextQuestion?: number | "end"; // Added for branching logic
}

interface FormValues {
    surveyName: string;
    description: string;
    startDate: string;
    endDate: string;
    triggerWord: string;
    questions: Question[];
    newQuestion: Question;
    completionMessage: string;
}

const initialValues: FormValues = {
    surveyName: '',
    description: '',
    startDate: '',
    endDate: '',
    triggerWord: '',
    questions: [],
    newQuestion: {
        question: '',
        responseType: 'free-text',
        options: [],
        allowMultiple: false,
        freeTextDescription: '',
        nextQuestion: undefined,
    },
    completionMessage: '',
}

const validationSchema = Yup.object().shape({
    surveyName: Yup.string().required("Survey Name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .min(Yup.ref("startDate"), "End Date must be after start date")
        .required("End date is required"),
    triggerWord: Yup.string().required("Trigger word is required"),
    newQuestion: Yup.object().shape({
        question: Yup.string().required("Question is required"),
        responseType: Yup.string()
            .oneOf(["free-text", "multiple-choice"])
            .required("Response Type is required"),
        options: Yup.array()
            .of(Yup.string().required("Option cannot be empty"))
            .when("responseType", {
                is: "multiple-choice",
                then: (schema) => schema.min(1, "At least one option is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
        allowMultiple: Yup.boolean(),
        freeTextDescription: Yup.string().notRequired(),
        nextQuestion: Yup.mixed().notRequired(),
    }),
});

const Page = () => {
    const [form, setForm] = useState<0 | 1 | 2 | number>(0);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleFormStep = (step: number) => {
        if (step < 3) {
            setForm(step);
        }
    }

    const handleSaveQuestion = (values: FormikValues, setFieldValue: (field: string, value: any) => void) => {
        if (editingIndex !== null) {
            // Update existing question
            const updatedQuestions = [...values.questions];
            updatedQuestions[editingIndex] = values.newQuestion;
            setFieldValue('questions', updatedQuestions);
            setEditingIndex(null);
        } else {
            // Add new question
            setFieldValue('questions', [...values.questions, values.newQuestion]);
        }
        // Reset newQuestion fields
        setFieldValue('newQuestion', {
            question: '',
            responseType: 'free-text',
            options: [],
            allowMultiple: false,
            freeTextDescription: '',
            nextQuestion: undefined,
        });
    };

    const handleEditQuestion = (index: number, values: FormikValues, setFieldValue: (field: string, value: any) => void) => {
        setEditingIndex(index);
        setFieldValue('newQuestion', values.questions[index]);
    };

    const handleDeleteQuestion = (index: number, values: FormikValues, setFieldValue: (field: string, value: any) => void) => {
        const updatedQuestions = values.questions.filter((_: any, i: number) => i !== index);
        setFieldValue('questions', updatedQuestions);
    };

    function RenderForm(
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        values: FormikValues,
        setFieldValue: (field: string, value: any) => void,
    ) {
        switch (form) {
            case 0:
                return (
                    <>
                        <div className=''>
                            <div className='py-6'>
                                <h1 className="font-bold text-lg pb-4">Create Survey</h1>
                                <hr />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-[#25262d] font-medium">Survey Name</label>
                                <Field
                                    name="surveyName"
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border rounded-md"
                                    placeholder="Enter Title"
                                />
                                {errors.surveyName && touched.surveyName ? (
                                    <span id="surveyName" className="text-sm text-red-500">
                                        <ErrorMessage id="surveyName" name="surveyName" />
                                    </span>
                                ) : null}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-[#25262d] font-medium">Description</label>
                                <Field
                                    name="description"
                                    as="textarea"
                                    className="w-full px-4 py-2 mt-2 border rounded-md"
                                    placeholder="Text Here"
                                />
                                {errors.description && touched.description ? (
                                    <span id="description" className="text-sm text-red-500">
                                        <ErrorMessage id="description" name="description" />
                                    </span>
                                ) : null}
                            </div>

                            <div className="flex space-x-6 w-full">
                                <div className="flex-1 space-y-[6px] mb-3">
                                    <label className="block text-sm text-[#25262d] font-medium">Start Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !values.startDate && "text-muted-foreground"
                                                )}
                                            >
                                                {values.startDate ? (
                                                    format(values.startDate, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <DatePicker name="startDate" />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.startDate && touched.startDate ? (
                                        <span id="startDate" className="text-sm text-red-500">
                                            <ErrorMessage id="startDate" name="startDate" />
                                        </span>
                                    ) : null}
                                </div>

                                <div className="flex-1 space-y-[6px] mb-3">
                                    <label className="block text-sm text-[#25262d] font-medium">End Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !values.endDate && "text-muted-foreground"
                                                )}
                                            >
                                                {values.endDate ? (
                                                    format(values.endDate, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}

                                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <DatePicker
                                                name="endDate"
                                                minDate={values.startDate ? new Date(values.startDate) : new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.endDate && touched.endDate ? (
                                        <span id="endDate" className="text-sm text-red-500">
                                            <ErrorMessage id="endDate" name="endDate" />
                                        </span>
                                    ) : null}
                                </div>
                            </div>

                            <div className="space-y-[6px] mb-3">
                                <label className="block text-sm text-[#25262d] font-medium">Trigger Word</label>
                                <Field
                                    type="text"
                                    name="triggerWord"
                                    placeholder="Enter Trigger Word ..."
                                    cols={30}
                                    rows={5}
                                    className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.triggerWord && touched.triggerWord ? (
                                    <span id="triggerWord" className="text-sm text-red-500">
                                        <ErrorMessage id="triggerWord" name="triggerWord" />
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </>
                );

            case 1:
                return (
                    <>
                        <div className=''>
                            <h1 className="font-bold text-lg pb-4">Create Questions</h1>
                            <hr className="mb-6" />

                            {/* Render Saved Questions */}
                            {values.questions.map((question: { question: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; responseType: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; options: any[]; }, index: React.Key | null | undefined) => (
                                <div key={index} className="mb-6 p-4 border rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-semibold">{question.question}</h2>
                                        <div className="flex space-x-2">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={() => handleEditQuestion(index, values, setFieldValue)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => handleDeleteQuestion(index, values, setFieldValue)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{question.responseType}</p>
                                    {question.responseType === "multiple-choice" && (
                                        <ul className="list-disc pl-5">
                                            {question.options.map((option: any, i: number) => (
                                                <li key={i}>{option}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}

                            {/* Add New Question Form */}
                            <div className="mt-6">
                                <div className="flex space-x-6 w-full">
                                    <div className='flex-1 space-y-[6px]'>
                                        <label className="block text-sm font-medium">Question</label>
                                        <Field name="newQuestion.question" type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Enter your question" />
                                        {(errors.newQuestion as FormikErrors<Question>)?.question && (touched.newQuestion as FormikTouched<Question>)?.question ? (
                                            <span className="text-sm text-red-500">
                                                <ErrorMessage id="newQuestion.question" name="newQuestion.question" />
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className='space-y-[6px]'>
                                        <label className="block text-sm font-medium">Response Type</label>
                                        <Field name="newQuestion.responseType" as="select" className="w-full px-4 py-2 border bg-white rounded-md">
                                            <option value="free-text">Free Text</option>
                                            <option value="multiple-choice">Multiple Choice</option>
                                        </Field>
                                        {(errors.newQuestion as FormikErrors<Question>)?.responseType && (touched.newQuestion as FormikTouched<Question>)?.responseType ? (
                                            <span className="text-sm text-red-500">
                                                <ErrorMessage id="newQuestion.responseType" name="newQuestion.responseType" />
                                            </span>
                                        ) : null}
                                    </div>
                                </div>

                                {values.newQuestion.responseType === "multiple-choice" && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium">Options</label>
                                        {values.newQuestion.options.map((option: any, index: number) => (
                                            <div key={index} className="flex space-x-2 mt-2">
                                                <Field
                                                    name={`newQuestion.options[${index}]`}
                                                    type="text"
                                                    className="w-full px-4 py-2 border rounded-md"
                                                    placeholder={`Option ${index + 1}`}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        const newOptions = values.newQuestion.options.filter((_: any, i: number) => i !== index);
                                                        setFieldValue('newQuestion.options', newOptions);
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="mt-2"
                                            onClick={() => setFieldValue('newQuestion.options', [...values.newQuestion.options, ''])}
                                        >
                                            Add Option
                                        </Button>
                                    </div>
                                )}

                                <div className='flex-1 space-y-[6px] mt-4'>
                                    <label className="block text-sm font-medium">Explanation (Optional)</label>
                                    <Field name="newQuestion.freeTextDescription" type="text" as='textarea' className="w-full px-4 py-2 border rounded-md" placeholder="Participants will give an open-ended answer..." />
                                </div>

                                <div className='py-3 space-y-6'>
                                    <hr />
                                    <div>
                                        <label className="block text-sm font-medium">After answer has been submitted, go to:</label>
                                        <Field as='select' name="newQuestion.nextQuestion" className="w-full px-4 py-2 border rounded-md">
                                            <option value="0" disabled={false} className="text-gray-400">Next Question, if added</option>
                                            {values.questions.map((_: any, index: number) => (
                                                <option key={index} value={index + 1}>Question {index + 1}</option>
                                            ))}
                                            <option value="end">End Survey</option>
                                        </Field>
                                    </div>
                                    <hr />
                                </div>

                                <div className="flex items-center justify-between pt-6">
                                    {/* Character Count */}
                                    <p className="text-center">{values.newQuestion.question?.length || 0} characters.</p>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center space-x-2">
                                            <TriangleAlert className="w-4 h-4 opacity-50" />
                                            <span>Message not saved</span>
                                        </div>

                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => handleSaveQuestion(values, setFieldValue)}
                                        >
                                            Save Message
                                        </Button>

                                        <button
                                            type="button"
                                            className="rounded-full border border-gray-400 p-[0.6rem] shadow-sm hover:border-red-500 focus-visible:outline-red-700"
                                            onClick={() => setFieldValue('newQuestion', {
                                                question: '',
                                                responseType: 'free-text',
                                                options: [],
                                                allowMultiple: false,
                                                freeTextDescription: '',
                                                nextQuestion: undefined,
                                            })}
                                        >
                                            <Trash2 className="w-4 h-4 opacity-50" />
                                        </button>
                                    </div>
                                </div>

                                <hr className='mt-4' />

                                <div className='flex justify-end items-center py-4'>
                                    <Button
                                        type="button"
                                        onClick={() => setFieldValue('newQuestion', {
                                            question: '',
                                            responseType: 'free-text',
                                            options: [],
                                            allowMultiple: false,
                                            freeTextDescription: '',
                                            nextQuestion: undefined,
                                        })}
                                    >
                                        Add New Question
                                    </Button>
                                </div>

                                <hr />
                            </div>

                        </div>
                    </>
                )

            case 2:
                return (
                    <>
                        <div>
                            <h1 className="text-lg font-bold mb-2">Compose a survey completion message (optional)</h1>
                            <p className="text-sm text-gray-600 mb-4">
                                This message will be sent to participants after they answer their last question.
                            </p>

                            <Field
                                as="textarea"
                                name="completionMessage"
                                placeholder="E.g. Thank you for taking the time to complete our survey! Your feedback is invaluable to us and helps us improve."
                                className="w-full p-3 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                rows={4}
                            />
                            <ErrorMessage name="completionMessage" component="div" className="text-xs pt-2 text-red-500" />

                            <div className="flex justify-between text-center items-center text-xs text-gray-500 mt-2 ">
                                <p>{values.completionMessage?.length || 0} characters</p>
                                <Button variant="secondary">Save Message</Button>
                            </div>
                        </div>
                    </>
                )

            default:
                return null;
        }
    }

    const handleSubmit = (values: FormValues) => {
        console.log(values);
    };

    function handleNextStep(
        values: FormValues,
        validateField: (
            field: string
        ) => Promise<void> | Promise<string | undefined>,
        setTouched: (
            touched: import("formik").FormikTouched<FormValues>,
            shouldValidate?: boolean | undefined
        ) => Promise<void | import("formik").FormikErrors<FormValues>>,
        errors: FormikErrors<FormValues>
    ) {
        switch (form) {
            case 0:
                if (
                    form === 0 &&
                    (!values.surveyName || !values.description || !values.startDate || !values.endDate || !values.triggerWord)
                ) {
                    // Validate all fields and mark them as touched
                    validateField('surveyName');
                    validateField('description');
                    validateField('startDate');
                    validateField('endDate');
                    validateField('triggerWord');
                    setTouched(
                        {
                            surveyName: true,
                            description: true,
                            startDate: true,
                            endDate: true,
                            triggerWord: true,
                        },
                        true // Ensure validation runs
                    );
                } else if (
                    form === 0 &&
                    !errors.surveyName &&
                    !errors.description &&
                    !errors.startDate &&
                    !errors.endDate &&
                    !errors.triggerWord
                ) {
                    // If no errors, proceed to the next step
                    setForm(form + 1);
                }
                break;

            case 1:
                if (
                    form === 1 &&
                    (!values.newQuestion.question || !values.newQuestion.responseType)
                ) {
                    validateField('newQuestion.question');
                    validateField('newQuestion.responseType');
                    setTouched({
                        newQuestion: {
                            question: true,
                            responseType: true,
                        }
                    });
                } else if (
                    form === 1 &&
                    !errors.newQuestion?.question &&
                    !errors.newQuestion?.responseType
                ) {
                    setForm(form + 1);
                }
                break;

            case 2:


            default:
                break;
        }
    }

    return (
        <div className="pt-8 mt-12 space-y-4  md:p-4">
            {/*  Indicators  */}
            <div> indicators</div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({
                      values,
                      isValid,
                      validateField,
                      touched,
                      setTouched,
                      errors,
                      setFieldValue,
                  }) => (
                    <Form className='bg-white p-6'>
                        {RenderForm(touched, errors, values, setFieldValue)}
                        <div className='py-6'>
                            <Transition
                                as={"div"}
                                show={form < 1}
                                enter="transition-opacity duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant={"default"}
                                        className="px-6 py-3 text-base font-semibold border border-transparent rounded-lg shadow-sm focus:outline-none w-auto space-x-2"
                                        onClick={() =>
                                            handleNextStep(values, validateField, setTouched, errors)
                                        }
                                    >
                                        <span>Next</span>
                                        <MoveRight />
                                    </Button>
                                </div>
                            </Transition>

                            <Transition
                                as={"div"}
                                show={form > 0}
                                enter="transition-opacity duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="flex justify-end gap-x-4">
                                    <Button
                                        type="button"
                                        className='space-x-2'
                                        variant={'outline'}
                                        onClick={() => handleFormStep(form - 1)}
                                    >
                                        <MoveLeft />
                                        <span>Back</span>
                                    </Button>
                                    <Button
                                        variant={"default"}
                                        className="px-6 py-3 text-base font-semibold border border-transparent rounded-lg shadow-sm focus:outline-none w-auto space-x-2"
                                        onClick={() =>
                                            handleNextStep(values, validateField, setTouched, errors)
                                        }
                                    >
                                        {form === 2 ? "Create Survey" : (
                                            <>
                                                <span>Next</span>
                                                <MoveRight />
                                            </>
                                        )
                                        }
                                    </Button>
                                </div>
                            </Transition>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Page;