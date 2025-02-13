"use client"
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import DatePicker from "@/components/common/DatePicker";
import {useRouter} from "next/navigation";
import * as Yup from "yup";
import CreateQuestion from "@/components/steps/createQuestion";



interface ValuesProps{
    surveyName: string;
    description: string;
    startDate: string;
    endDate: string;
    triggerWord: string;
}

// Validation schema
const validationSchema = Yup.object({
    surveyName: Yup.string().required("Survey Name is required"),
    description: Yup.string().required("Description is required"),
    triggerWord: Yup.string().required("Trigger Word is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
        .min(Yup.ref("startDate"), "End Date must be after Start Date")
        .required("End Date is required"),
});


const Page = () => {

    const [step, setStep] = useState(1);
    const router = useRouter()

    const handleSubmit = (values: ValuesProps) => {
        console.log(values);

        // Proceed to next step
        setStep(2);
    };

    return (
        <div className="pt-8 mt-12 space-y-4  md:p-4">
            {/*    */}
            <div> indicators</div>

            {step === 1 && (
                <div className='bg-white p-6'>
                    <div className='py-6'>
                        <h1 className="font-bold text-lg pb-4">Create Survey</h1>
                        <hr/>
                    </div>

                    <Formik
                        initialValues={{
                            surveyName: '',
                            description: '',
                            startDate: '',
                            endDate: '',
                            triggerWord: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit} >
                        {({ values }) => (
                            <Form>
                                <div className="mb-6">
                                    <label className="block text-sm text-[#25262d] font-medium">Survey Name</label>
                                    <Field
                                        name="surveyName"
                                        type="text"
                                        className="w-full px-4 py-2 mt-2 border rounded-md"
                                        placeholder="Enter Title"
                                    />
                                    <ErrorMessage name="surveyName" component="div" className="text-xs pt-2 text-red-500" />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm text-[#25262d] font-medium">Description</label>
                                    <Field
                                        name="description"
                                        as="textarea"
                                        className="w-full px-4 py-2 mt-2 border rounded-md"
                                        placeholder="Text Here"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-xs pt-2 text-red-500" />
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
                                        <ErrorMessage
                                            name="startDate"
                                            component="div"
                                            className="text-xs pt-2 text-red-500"
                                        />
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
                                        <ErrorMessage name="endDate" component="div" className="text-xs pt-2 text-red-500" />
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
                                    <ErrorMessage
                                        name="triggerword"
                                        component="div"
                                        className="text-xs pt-2 text-red-500"
                                    />
                                </div>

                                <div className="flex items-end justify-end space-x-3">
                                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                                    <Button type="submit">Next</Button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            )}

            {step === 2 && (
                <div className='bg-white p-6'>

                    <CreateQuestion />

                    <div className="flex items-end justify-end space-x-3">
                        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit">Next</Button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Page;