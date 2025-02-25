"use client";
import { Button } from "@/components/ui/button";
import {
	Description,
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import MultiSelect from "@/components/common/MultiSelect";

interface ValuesProps {
	names: string;
	phone: string;
	email: string;
	gender: string;
	contactgroups: Array<string>;
}

interface Option {
	label: string;
	value: string;
}

const validationSchema = Yup.object({
	names: Yup.string().required("Question is required"),
	phone: Yup.string().required("Survey ID is required"),
	email: Yup.string().email().required("Service is required"),
	gender: Yup.string().required("Answer Type is required"),
	contactgroups: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required("Label is required"),
        value: Yup.string().required("Value is required"),
      })
    )
    .required("Contact group is required"),
});

export default function Page() {
	const router = useRouter();
	const handleSubmit = (values: ValuesProps) => {
		console.log(values);
	};

	return (
		<Dialog
			open={true}
			onClose={() => console.log("")}
			className="relative z-50"
		>
			{/* The backdrop, rendered as a fixed sibling to the panel container */}
			<DialogBackdrop className="fixed inset-0 bg-black/30" />

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex w-screen items-center justify-center">
				{/* The actual dialog panel  */}
				<DialogPanel className="space-y-4 bg-white p-6 rounded-xl">
					<div className="flex items-center justify-between">
						<DialogTitle className="font-bold">Create a contact</DialogTitle>
						<Button variant="outline" size="icon" onClick={() => router.back()}>
							<X className="h-5 w-5" />
						</Button>
					</div>
					<Description>Enter details to create a contact</Description>

					<hr className="mt-6" />
					<Formik<ValuesProps>
						initialValues={{
							names: "",
							phone: "",
							email: "",
							gender: "",
							contactgroups: [],
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values }) => (
							<Form>
                                <div className="space-y-[13px]">
								<div className="space-y-[6px]">
									<label className="text text-sm">Names</label>
									<Field
										name="names"
										placeholder="Enter name ..."
										className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									/>
									<ErrorMessage
										name="names"
										component="div"
										className="text-red-600 text-sm"
									/>
								</div>
								<div className="space-y-[6px]">
									<label className="text text-sm">Phone Number</label>
									<Field
										name="phone"
										placeholder="Enter phone number ..."
										className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									/>
									<ErrorMessage
										name="phone"
										component="div"
										className="text-red-600 text-sm"
									/>
								</div>
								<div className="space-y-[6px]">
									<label className="text text-sm">Email</label>
									<Field
										type="email"
										name="email"
										placeholder="Enter email ..."
										className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									/>
									<ErrorMessage
										name="email"
										component="div"
										className="text-red-600 text-sm"
									/>
								</div>
								<div className="space-y-[6px]">
									<label className="text-sm font-medium">Gender</label>
									<Field
										as="select"
										name="gender"
										className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="">Prefer not say</option>
									</Field>
									<ErrorMessage
										name="gender"
										component="div"
										className="text-red-600 text-sm"
									/>
								</div>
								<div className="space-y-[6px]">
									<label className="text-sm font-medium">
										Choose contact group
									</label>
									<MultiSelect name="contactgroups" />

									<ErrorMessage
										name="contactgroups"
										component="div"
										className="text-red-600 text-sm"
									/>
								</div>
								<hr className="mt-6" />
								<div className="flex items-end justify-end pt-[17px] space-x-3">
									<Button variant="outline" onClick={() => router.back()}>
										Cancel
									</Button>
									<Button type="submit">Save</Button>
								</div>
                                </div>
							</Form>
						)}
					</Formik>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
