"use client"
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {ErrorMessage, Field, Form, Formik, FormikErrors, FormikTouched, FormikValues} from "formik";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon, MoveLeft, MoveRight, Trash2, TriangleAlert} from "lucide-react";
import DatePicker from "@/components/common/DatePicker";
import * as Yup from "yup";
import {Transition} from "@headlessui/react";

interface Question {
    question: string;
    responseType: "free-text" | "multiple-choice";
    options: string[];
    allowMultiple?: boolean;
    freeTextDescription?: string;
}

interface Recipient {
    id: string;
    name: string;
    email: string;
}

interface FormValues {
    surveyName: string;
    description: string;
    startDate: string;
    endDate: string;
    triggerWord: string;
    questions: Question[];
    completionMessage?: string;
    recipients: Recipient[];
    invitationMessage: string;
    scheduleTime: string;
}

const initialValues: FormValues = {
    surveyName: '',
    description: '',
    startDate: '',
    endDate: '',
    triggerWord: '',
    questions: [{
        question: '',
        responseType: "free-text",
        options: [],
        allowMultiple: false,
        freeTextDescription: '',
    }],
    completionMessage: '',
    recipients: [
        {
            'id': '1',
            'name': 'Alex Otieno',
            'email': 'alex@example.com',
        }
    ],
    invitationMessage: '',
    scheduleTime: '',
};

const validationSchema = Yup.object().shape({
    surveyName: Yup.string().required("Survey Name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .min(Yup.ref("startDate"), "End Date must be after start date")
        .required("End date is required"),
    triggerWord: Yup.string().required("Trigger word is required"),
    questions: Yup.array().of(
        Yup.object().shape({
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
        })
    ),
    completionMessage: Yup.string().notRequired(),
});



const Page = () => {
    // const [form, setForm] = useState<0 | 1 | 2 | number>(0);

    const [currentStep, setCurrentStep] = useState<0 | 1 | 2 | 3 | number>(0); // 0: Survey Details, 1: Questions, 2: Survey Outro, 3: Send Survey
    const [sendSurveyStep, setSendSurveyStep] = useState<0 | 1 | 2 | 3 | number>(0); // 0: Add Recipients, 1: Review Recipients, 2: Invitation, 3: Send

    const handleFormStep = (step: number) => {
        if (step < 4) {
            setCurrentStep(step);
        }
    }

    function RenderForm(
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        values: FormikValues,
        setFieldValue: (field: string, value: any) => void,
    ) {
        switch (currentStep) {
            case 0: // Survey Details
                return (
                    <>
                        <div className=''>
                            <div className='py-6'>
                                <h1 className="font-bold text-lg pb-4">Create Survey</h1>
                                <hr/>
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

            case 1: // Questions
                return (
                    <>
                        <div className=''>
                            <h1 className="font-bold text-lg pb-4">Create Questions</h1>
                            <hr className="mb-6" />

                            {values.questions.map((question: Question & { isSaved?: boolean; isSaving?: boolean; isEditing?: boolean }, index: number) => (
                                <div key={index} className="mt-6">
                                    <div className="flex space-x-6 w-full">
                                        <div className='flex-1 space-y-[6px]'>
                                            <label className="block text-sm font-medium">Question</label>
                                            <Field
                                                name={`questions[${index}].question`}
                                                type="text"
                                                className="w-full px-4 py-2 border rounded-md"
                                                placeholder="Enter your question"
                                                onFocus={() => {
                                                    if (question.isSaved) {
                                                        setFieldValue(`questions[${index}].isEditing`, true);
                                                    }
                                                }}
                                            />
                                            {/*{errors.questions?.[index]?.question && touched.questions?.[index]?.question ? (*/}
                                                <span className="text-sm text-red-500">
                                                    <ErrorMessage name={`questions[${index}].question`} />
                                                </span>
                                            {/*) : null}*/}
                                        </div>

                                        <div className='space-y-[6px]'>
                                            <label className="block text-sm font-medium">Response Type</label>
                                            <Field
                                                name={`questions[${index}].responseType`}
                                                as="select"
                                                className="w-full px-4 py-2 border bg-white rounded-md"
                                                onFocus={() => {
                                                    if (question.isSaved) {
                                                        setFieldValue(`questions[${index}].isEditing`, true);
                                                    }
                                                }}
                                            >
                                                <option value="free-text">Free Text</option>
                                                <option value="multiple-choice">Multiple Choice</option>
                                            </Field>
                                            {/*{errors.questions?.[index]?.responseType && touched.questions?.[index]?.responseType ? (*/}
                                                <span className="text-sm text-red-500">
                                        <ErrorMessage name={`questions[${index}].responseType`} />
                                    </span>
                                            {/*) : null}*/}
                                        </div>
                                    </div>

                                    {/* Only show options input if responseType is multiple-choice */}
                                    {question.responseType === "multiple-choice" && (
                                        <>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium">Options</label>
                                                {question.options.map((option: string, optionIndex: number) => (
                                                    <div key={optionIndex} className="flex justify-between space-x-10 mt-2 items-center">
                                                        {/* Label with numbering */}
                                                        <div className="flex-1 items-center">
                                                            <div className='flex justify-between'>
                                                                <span className="text-sm font-medium">Label {optionIndex + 1}</span>
                                                                {/* Remove button as an "X" mark with "Remove" text */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newOptions = question.options.filter((_, i: number) => i !== optionIndex);
                                                                        setFieldValue(`questions[${index}].options`, newOptions);
                                                                    }}
                                                                    className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                                                >
                                                                    <span className="text-lg">×</span>
                                                                    <span className="text-sm">Remove</span>
                                                                </button>
                                                            </div>
                                                            <Field
                                                                name={`questions[${index}].options[${optionIndex}]`}
                                                                type="text"
                                                                className="w-full px-4 py-2 border rounded-md"
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                            />
                                                        </div>

                                                        {/* Branching input for options */}
                                                        <div className="flex-1 space-y-2">
                                                            <label className="block text-sm font-medium">After child questions, go to:</label>
                                                            <Field
                                                                as="select"
                                                                name={`questions[${index}].branching[${optionIndex}]`}
                                                                className="w-full px-4 py-2 border rounded-md"
                                                            >
                                                                {/* Disabled "Next Question, if added" option */}
                                                                <option value="0" disabled className="text-gray-400">
                                                                    Next Question, if added
                                                                </option>

                                                                {/* List all created questions */}
                                                                {values.questions.map((q: Question, qIndex: number) => (
                                                                    qIndex !== index && ( // Exclude the current question
                                                                        <option key={qIndex} value={qIndex}>
                                                                            Question {qIndex + 1}
                                                                        </option>
                                                                    )
                                                                ))}

                                                                <option className="disabled:cursor-not-allowed" value="-2" disabled={true}>-- No More Options --</option>

                                                                {/* End Survey option */}
                                                                <option value="-1">End Survey</option>
                                                            </Field>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Add Option button */}
                                                <Button
                                                    type="button"
                                                    variant={'outline'}
                                                    onClick={() => {
                                                        const newOptions = [...question.options, ""];
                                                        setFieldValue(`questions[${index}].options`, newOptions);
                                                    }}
                                                    className="mt-4 px-4 py-2 border-blue-500 text-blue-400 hover:text-blue-500 hover:shadow-md hover:bg-white rounded-md"
                                                >
                                                    Add Option
                                                </Button>
                                            </div>

                                            {/* Allow Multiple Options Checkbox (only for multiple-choice) */}
                                            <div className="mt-4 flex items-center space-x-2">
                                                <Field
                                                    type="checkbox"
                                                    name={`questions[${index}].allowMultiple`}
                                                    id={`allowMultiple-${index}`}
                                                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                                />
                                                <label htmlFor={`allowMultiple-${index}`} className="text-sm font-medium">
                                                    Allow participant to pick more than one option
                                                </label>
                                            </div>
                                        </>
                                    )}

                                    {/* Conditionally render the Explanation (Optional) input (only for free-text) */}
                                    {question.responseType === "free-text" && (
                                        <div className='flex-1 space-y-[6px] mt-4'>
                                            <label className="block text-sm font-medium">Explanation (Optional)</label>
                                            <Field
                                                name={`questions[${index}].freeTextDescription`}
                                                as="textarea"
                                                className="w-full px-4 py-2 border rounded-md"
                                                placeholder="Participants will give an open-ended answer..."
                                            />
                                        </div>
                                    )}

                                    <div className='py-3 space-y-6'>
                                        <hr />
                                        <div>
                                            <label className="block text-sm font-medium">After answer has been submitted, go to:</label>
                                            <Field
                                                as="select"
                                                name={`questions[${index}].branching`}
                                                className="w-full px-4 py-2 border rounded-md"
                                            >
                                                {/* Disabled "Next Question, if added" option */}
                                                <option value="0" disabled className="text-gray-400">
                                                    Next Question, if added
                                                </option>

                                                {/* List all created questions */}
                                                {values.questions.map((q: Question, qIndex: number) => (
                                                    qIndex !== index && ( // Exclude the current question
                                                        <option key={qIndex} value={qIndex}>
                                                            Question {qIndex + 1}
                                                        </option>
                                                    )
                                                ))}

                                                <option className="disabled:cursor-not-allowed" value="-2" disabled={true}>-- No questions --</option>

                                                {/* End Survey option */}
                                                <option value="-1">End Survey</option>
                                            </Field>
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="flex items-center justify-between pt-6">
                                        <p className="text-center">{question.question?.length || 0} characters.</p>
                                        <div className="flex items-center space-x-6">
                                            {/* Question Not Saved / Saving Question */}
                                            {(question.isEditing || !question.isSaved) && (
                                                <div className="flex items-center space-x-2">
                                                    <TriangleAlert className="w-4 h-4 opacity-50 text-red-500" />
                                                    <span className={question.isSaving ? "text-yellow-500" : "text-red-500"}>
                                            {question.isSaving ? "Saving Question..." : "Question Not Saved"}
                                        </span>
                                                </div>
                                            )}

                                            {/* Save Button (shown when editing or not saved) */}
                                            {(question.isEditing || !question.isSaved) && (
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        // Mark question as saving
                                                        setFieldValue(`questions[${index}].isSaving`, true);

                                                        // Simulate saving (e.g., API call)
                                                        await new Promise((resolve) => setTimeout(resolve, 1000));

                                                        // Mark question as saved and not editing
                                                        setFieldValue(`questions[${index}].isSaving`, false);
                                                        setFieldValue(`questions[${index}].isSaved`, true);
                                                        setFieldValue(`questions[${index}].isEditing`, false);
                                                    }}
                                                >
                                                    Save Question
                                                </Button>
                                            )}

                                            {/* Delete Icon (shown when question is saved and not editing) */}
                                            {question.isSaved && !question.isEditing && (
                                                <button
                                                    type="button"
                                                    className="rounded-full border border-gray-400 p-[0.6rem] shadow-sm hover:border-red-500 focus-visible:outline-red-700"
                                                    onClick={() => {
                                                        const newQuestions = values.questions.filter((_: any, i: number) => i !== index);
                                                        setFieldValue("questions", newQuestions);
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4 opacity-50" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <hr className='mt-4' />
                                </div>
                            ))}

                            <div className='flex justify-end items-center py-4'>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        const newQuestion = {
                                            question: '',
                                            responseType: "free-text",
                                            options: [],
                                            allowMultiple: false,
                                            freeTextDescription: '',
                                            isSaved: false, // Default to not saved
                                            isSaving: false, // Default to not saving
                                            isEditing: false, // Default to not editing
                                        };
                                        setFieldValue("questions", [...values.questions, newQuestion]);
                                    }}
                                >
                                    Add New Question
                                </Button>
                            </div>

                            <hr/>
                        </div>
                    </>
                );

            case 2:  // Survey Outro
                return (
                    <>
                        <div>
                            <h1 className="text-lg font-bold mb-2">Compose a survey completion message (optional)</h1>
                            <p className="text-sm text-gray-600 mb-4">
                                This message will be sent to participants after they answer their last question.
                            </p>

                            {/* Completion Message Textarea */}
                            <Field
                                as="textarea"
                                name="completionMessage"
                                placeholder="E.g. Thank you for taking the time to complete our survey! Your feedback is invaluable to us and helps us improve."
                                className="w-full p-3 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                rows={4}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    // Reset save state when the user edits the message
                                    if (values.isCompletionMessageSaved) {
                                        setFieldValue("isCompletionMessageSaved", false);
                                    }
                                    // Update the completion message
                                    setFieldValue("completionMessage", e.target.value);
                                }}
                            />
                            <ErrorMessage name="completionMessage" component="div" className="text-xs pt-2 text-red-500" />

                            {/* Character Count and Save Button */}
                            <div className="flex justify-between text-center items-center text-xs text-gray-500 mt-2">
                                <p>{values.completionMessage?.length || 0} characters</p>
                                <Button
                                    type="button"
                                    variant={values.isCompletionMessageSaved ? "secondary" : "default"} // Blue when not saved, gray when saved
                                    onClick={async () => {
                                        // Mark completion message as saving
                                        setFieldValue("isSavingCompletionMessage", true);

                                        // Simulate saving (e.g., API call)
                                        await new Promise((resolve) => setTimeout(resolve, 1000));

                                        // Mark completion message as saved
                                        setFieldValue("isSavingCompletionMessage", false);
                                        setFieldValue("isCompletionMessageSaved", true);
                                    }}
                                    disabled={values.isCompletionMessageSaved} // Disable button after saving
                                >
                                    {values.isSavingCompletionMessage ? "Saving..." : "Save Message"}
                                </Button>
                            </div>
                        </div>
                    </>
                );

            case 3: // Send Survey
                switch (sendSurveyStep) {
                    case 0: // Add Recipients
                        return (
                            <div>
                                <h1 className="font-bold text-lg pb-4">Add Survey Participants</h1>
                                <hr className="mb-6" />

                                <div className="flex space-x-4 mb-6">
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        className="flex-1"
                                    >
                                        Select from contacts list
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        className="flex-1"
                                    >
                                        Upload file
                                    </Button>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm text-[#25262d] font-medium">Select Survey Participants from your contacts list</label>
                                    <div className="mt-2">
                                        <label className="inline-flex items-center">
                                            <Field
                                                type="radio"
                                                name="recipients"
                                                value="all"
                                                className="form-radio"
                                            />
                                            <span className="ml-2">All contacts (1)</span>
                                        </label>
                                        <label className="inline-flex items-center ml-6">
                                            <Field
                                                type="radio"
                                                name="recipients"
                                                value="select"
                                                className="form-radio"
                                            />
                                            <span className="ml-2">Select Survey Participants</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        );

                    case 1: // Review Recipients
                        return (
                            <div>
                                <h1 className="font-bold text-lg pb-4">Review Recipients</h1>
                                <hr className="mb-6" />

                                {/* Display recipients in a table */}
                                <table className="">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Alex Otieno</td>
                                        <td>alex@gmail.com</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        );

                    case 2: // Invitation
                        return (
                            <div>
                                <h1 className="font-bold text-lg pb-4">Compose Invitation</h1>
                                <hr className="mb-6" />

                                {/* Invitation Message Textarea */}
                                <div className="mb-6">
                                    <label className="block text-sm text-[#25262d] font-medium">Invitation Message</label>
                                    <Field
                                        as="textarea"
                                        name="invitationMessage"
                                        className="w-full px-4 py-2 mt-2 border rounded-md"
                                        rows={4}
                                    />
                                </div>

                                {/* Schedule Time Picker */}
                                <div className="mb-6">
                                    <label className="block text-sm text-[#25262d] font-medium">Schedule Time</label>
                                    <Field
                                        type="datetime-local"
                                        name="scheduleTime"
                                        className="w-full px-4 py-2 mt-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        );

                    case 3: // Send
                        return (
                            <div>
                                <h1 className="font-bold text-lg pb-4">Review and Send</h1>
                                <hr className="mb-6" />

                                {/* Display invitation details */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold">Invitation Message</h2>
                                    <p>{values.invitationMessage}</p>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold">Scheduled Time</h2>
                                    <p>{values.scheduleTime}</p>
                                </div>
                            </div>
                        );

                    default:
                        return null;
                }

            default:
                return null;
        }
    }

    const handleSubmit = (values: FormValues) => {
        console.log(values);
    };

    function handleNextStep(
        values: FormValues,
        validateField: (field: string) => Promise<void> | Promise<string | undefined>,
        setTouched: (touched: import("formik").FormikTouched<FormValues>, shouldValidate?: boolean | undefined) => Promise<void | import("formik").FormikErrors<FormValues>>,
        errors: FormikErrors<FormValues>
    ) {
        switch (currentStep) {
            case 0:
                if (
                    currentStep === 0 &&
                    (!values.surveyName || !values.description || !values.startDate || !values.endDate || !values.triggerWord)
                ) {
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
                        true
                    );
                } else if (
                    currentStep === 0 &&
                    !errors.surveyName &&
                    !errors.description &&
                    !errors.startDate &&
                    !errors.endDate &&
                    !errors.triggerWord
                ) {
                    setCurrentStep(currentStep + 1);
                }
                break;

            case 1:
                if (
                    currentStep === 1 &&
                    values.questions.some(question => !question.question || !question.responseType)
                ) {
                    values.questions.forEach((_, index) => {
                        validateField(`questions[${index}].question`);
                        validateField(`questions[${index}].responseType`);
                    });
                    setTouched({
                        questions: values.questions.map(() => ({
                            question: true,
                            responseType: true,
                        }))
                    });
                } else if (
                    currentStep === 1 &&
                    !errors.questions
                ) {
                    setCurrentStep(currentStep + 1);
                }
                break;

            case 2:
                if (!values.completionMessage) {
                    validateField('completionMessage');
                    setTouched({ completionMessage: true }, true);
                } else if (!errors.completionMessage) {
                    setCurrentStep(currentStep + 1);
                }
                break;

            case 3:
                if (sendSurveyStep < 3) {
                    setSendSurveyStep(sendSurveyStep + 1);
                } else {
                    handleSubmit(values);
                }
                break;

            default:
                break;
        }
    }

    const isStep0Complete = (values: FormValues) => {
        return (
            values.surveyName &&
            values.description &&
            values.startDate &&
            values.endDate &&
            values.triggerWord
        );
    };

    const isStep1Complete = (values: FormValues) => {
        return values.questions.every(
            (question) =>
                question.question &&
                question.responseType &&
                (question.responseType === "free-text" || question.options.length > 0)
        );
    };

    const isStep2Complete = (values: FormValues) => {
        return values.completionMessage;
    };

    const isStep3Complete = (values: FormValues) => {
        return values.recipients.length > 0;
    };

    const isStep4Complete = (values: FormValues) => {
        return values.invitationMessage && values.scheduleTime;
    };


    return (
        <div className="pt-8 mt-12 space-y-4 md:p-4">
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
                    <>
                        <div className="flex space-x-4">
                            <div
                                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                                    currentStep === 0
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-500 hover:bg-gray-100"
                                }`}
                                onClick={() => setCurrentStep(0)}
                            >
                                Survey Details
                            </div>

                            <div
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    currentStep === 1
                                        ? "bg-blue-500 text-white"
                                        : isStep0Complete(values)
                                            ? "bg-white text-gray-500 hover:bg-gray-100 cursor-pointer"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                                onClick={() => {
                                    if (isStep0Complete(values)) {
                                        setCurrentStep(1);
                                    }
                                }}
                            >
                                Questions ({values.questions.length})
                            </div>

                            <div
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    currentStep === 2
                                        ? "bg-blue-500 text-white"
                                        : isStep1Complete(values)
                                            ? "bg-white text-gray-500 hover:bg-gray-100 cursor-pointer"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                                onClick={() => {
                                    if (isStep1Complete(values)) {
                                        setCurrentStep(2);
                                    }
                                }}
                            >
                                Survey Outro
                            </div>

                            <div
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    currentStep === 3
                                        ? "bg-blue-500 text-white"
                                        : isStep2Complete(values)
                                            ? "bg-white text-gray-500 hover:bg-gray-100 cursor-pointer"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                                onClick={() => {
                                    if (isStep2Complete(values)) {
                                        setCurrentStep(3);
                                    }
                                }}
                            >
                                Send Survey
                            </div>
                        </div>

                        {currentStep === 3 && (
                            <div className="flex space-x-4 mt-4">
                                <div
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        sendSurveyStep === 0
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-500 hover:bg-gray-100 cursor-pointer"
                                    }`}
                                    onClick={() => setSendSurveyStep(0)}
                                >
                                    Add Recipients
                                </div>

                                <div
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        sendSurveyStep === 1
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-500 hover:bg-gray-100 cursor-pointer"
                                    }`}
                                    onClick={() => setSendSurveyStep(1)}
                                >
                                    Review Recipients
                                </div>

                                <div
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        sendSurveyStep === 2
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-500 hover:bg-gray-100 cursor-pointer"
                                    }`}
                                    onClick={() => setSendSurveyStep(2)}
                                >
                                    Invitation
                                </div>

                                <div
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        sendSurveyStep === 3
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-500 hover:bg-gray-100 cursor-pointer"
                                    }`}
                                    onClick={() => setSendSurveyStep(3)}
                                >
                                    Send
                                </div>
                            </div>
                        )}

                        <Form className='bg-white p-6'>
                            {RenderForm(touched, errors, values, setFieldValue)}
                            <div className='py-6'>
                                <Transition
                                    as={"div"}
                                    show={true}
                                    enter="transition-opacity duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="flex justify-end gap-x-4">
                                        {currentStep > 0 && (
                                            <Button
                                                type="button"
                                                className='space-x-2'
                                                variant={'outline'}
                                                onClick={() => {
                                                    if (currentStep === 3 && sendSurveyStep > 0) {
                                                        setSendSurveyStep(sendSurveyStep - 1);
                                                    } else {
                                                        setCurrentStep(currentStep - 1);
                                                    }
                                                }}
                                            >
                                                <MoveLeft />
                                                <span>Back</span>
                                            </Button>
                                        )}
                                        <Button
                                            type="button"
                                            variant={"default"}
                                            className="px-6 py-3 text-base font-semibold border border-transparent rounded-lg shadow-sm focus:outline-none w-auto space-x-2"
                                            onClick={() => handleNextStep(values, validateField, setTouched, errors)}
                                        >
                                            {currentStep === 3 && sendSurveyStep === 3 ? "Send Survey" : (
                                                <>
                                                    <span>Next</span>
                                                    <MoveRight />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Transition>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default Page;