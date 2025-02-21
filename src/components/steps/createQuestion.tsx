import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import {TriangleAlert} from "lucide-react";
import { QuestionProps } from "@/types";

const questionSchema = Yup.object().shape({
    question: Yup.string().required("Question is required"),
    responseType: Yup.string().oneOf(["free-text", "multiple-choice"]).required("Response Type is required"),
    options: Yup.array()
        .of(Yup.string().required("Option cannot be empty"))
        .when("responseType", {
            is: "multiple-choice",
            then: (schema) => schema.min(1, "At least one option is required"),
            otherwise: (schema) => schema.notRequired(),
        }),
    allowMultiple: Yup.boolean(),
    freeTextDescription: Yup.string().notRequired(), // Not required
});


const CreateQuestion = () => {
    const router = useRouter();

    // Explicitly define the type of the questions state
    const [questions, setQuestions] = useState<QuestionProps[]>([]);

    const handleAddQuestion = (values: QuestionProps, { resetForm }: any) => {
        setQuestions([...questions, values]);
        resetForm();
    };

    return (
        <div className="bg-white p-6">
            <h1 className="font-bold text-lg pb-4">Create Questions</h1>
            <hr className="mb-6" />

            <Formik
                initialValues={{
                    question: "",
                    responseType: "free-text",
                    options: [] as string[],
                    allowMultiple: false,
                    freeTextDescription: '',
                }}
                validationSchema={questionSchema}
                onSubmit={handleAddQuestion}
            >
                {({ values }) => (
                    <Form className="space-y-4">
                        <div className="flex space-x-6 w-full">
                            <div className='flex-1 space-y-[6px]'>
                                <label className="block text-sm font-medium">Question</label>
                                <Field name="question" type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Enter your question" />
                                <ErrorMessage name="question" component="div" className="text-xs pt-2 text-red-500" />
                            </div>

                            <div className='space-y-[6px]'>
                                <label className="block text-sm font-medium">Response Type</label>
                                <Field name="responseType" as="select" className="w-full px-4 py-2 border bg-white rounded-md">
                                    <option value="free-text">Free Text</option>
                                    <option value="multiple-choice">Multiple Choice</option>
                                </Field>
                                <ErrorMessage name="responseType" component="div" className="text-xs pt-2 text-red-500" />
                            </div>
                        </div>

                        {/* Show input field only for "free-text" */}
                        {values.responseType === "free-text" && (
                            <div className='flex-1 space-y-[6px]'>
                                <label className="block text-sm font-medium">Explanation (Optional)</label>
                                <Field name="freeTextDescription" type="text" as='textarea' className="w-full px-4 py-2 border rounded-md" placeholder="Participants will give an open-ended answer..." />
                            </div>
                        )}

                        {values.responseType === "multiple-choice" && (
                            <FieldArray name="options">
                                {({ push, remove }) => (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">Options</label>
                                        {values.options.map((_, index) => (
                                            <div key={index} className="flex space-x-2">
                                                <Field name={`options.${index}`} className="flex-1 px-4 py-2 border rounded-md" placeholder={`Option ${index + 1}`} />
                                                <Button variant="destructive" type="button" onClick={() => remove(index)}>X</Button>
                                            </div>
                                        ))}
                                        <Button type="button" onClick={() => push("")}>Add Option</Button>
                                        <ErrorMessage name="options" component="div" className="text-xs pt-2 text-red-500" />

                                        <div className="flex items-center mt-2">
                                            <Field type="checkbox" name="allowMultiple" className="mr-2" />
                                            <label className="text-sm">Allow multiple selections</label>
                                        </div>
                                    </div>
                                )}
                            </FieldArray>
                        )}

                        <div className="flex space-x-3 justify-end">
                            <div className='flex items-center justify-center text-red-500 space-x-1'>
                                <TriangleAlert />
                                <p>Question not saved</p>
                            </div>
                            <Button type="submit">Save Question</Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="mt-6">
                {/*<h2 className="text-lg font-bold">Saved Questions</h2>*/}
                <ul className="space-y-4 mt-4">
                    {questions.map((q, idx) => (
                        <li key={idx} className="border p-4 rounded-md">
                            <p className="font-medium">{q.question}</p>
                            <p className="text-sm text-gray-600">Type: {q.responseType.replace("-", " ")}</p>
                            {q.responseType === "multiple-choice" && (
                                <ul className="ml-4 mt-2 list-disc">
                                    {q.options.map((opt, i) => (
                                        <li key={i}>{opt}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CreateQuestion;
