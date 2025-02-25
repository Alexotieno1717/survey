
"use client"

import MultiSelect from '@/components/common/MultiSelect';
import { Button } from '@/components/ui/button';
import HeaderWithButton from '@/components/ui/HeaderWithButton'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from 'next/navigation';
import React from 'react'
import * as Yup from "yup";


interface ValuesProps {
	contactgroup: { label: string; value: string }[];
	phone_number: string;
	status: string;
}

const validationSchema = Yup.object({
	contactgroup: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
      })
    )
    .min(1, "Please select at least one contact group")
    .required("Contact group is required"),
	phone_number: Yup.string().required("Phone Number is required"),
	status: Yup.string().required("Status is required"),
});

export default function SurveyEdit() {


	const router = useRouter();

    const handleSubmit = (values: ValuesProps) => {
        console.log("cosoling values")
		console.log(values);
	};


  return (
    <div className="pt-8 mt-12 space-y-4 md:p-4">
      <HeaderWithButton title="Contact Group Maps Edit" showButton={false} />

        <div className='bg-white rounded-[8px] p-10'>
            <Formik<ValuesProps>
                initialValues={{
                    contactgroup: [],
                    phone_number: "",
                    status: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values,  }) => (
                    <Form className='space-y-6'>
                        <div className="space-y-[6px]">
                            <label className="text-sm font-medium">
                                Choose contact group
                            </label>
                            <MultiSelect 
                                name="contactgroup"
                             />

                            <ErrorMessage
                                name="contactgroup"
                                component="div"
                                className="text-sm text-red-600"
                            />
                        </div>
                        <div className="space-y-[6px]">
                            <label className="text-sm font-medium">phone number</label>
                            <Field
                                as="textarea"
                                name="phone_number"
                                placeholder="Enter Phone Number ..."
                                className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <ErrorMessage
                                name="phone_number"
                                component="div"
                                className="text-sm text-red-600"
                            />
                        </div>
                        <div className="space-y-[6px]">
                            <label className="text-sm font-medium">Status</label>
                            <Field
                                as="select"
                                name="status"
                                className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">select Status</option>
                                <option value="2">ACTIVE</option>
                                <option value="3">INACTIVE</option>
                            </Field>
                            <ErrorMessage
                                name="status"
                                component="div"
                                className="text-sm text-red-600"
                            />
                        </div>

                        <hr className="mt-6" />
                        <div className="flex items-end justify-end pt-[17px] space-x-3">
                        <Button variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit">Edit Contact Group Maps</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}
