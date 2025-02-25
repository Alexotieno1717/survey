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
	name: string;
	client: string;
	contact: Array<string>;
	status: string;
}

const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	client: Yup.string().required("Client is required"),
	contact: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required("Label is required"),
        value: Yup.string().required("Value is required"),
      })
    )
    .required("Contact is required"),
	status: Yup.string().required("Status Response is required"),
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
						<DialogTitle className="font-bold">Create a contact group</DialogTitle>
						<Button variant="outline" size="icon" onClick={() => router.back()}>
							<X className="h-5 w-5" />
						</Button>
					</div>
					<Description>Enter details to create a contact group</Description>

					<hr className="mt-6" />
					<Formik<ValuesProps>
						initialValues={{
							name: "",
							client: "",
							contact: [],
							status: "",
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values }) => (
							<Form>
								<div className="space-y-[13px]">
									<div className="space-y-[6px]">
										<label className="text text-sm">Name</label>
										<Field
											name="name"
											placeholder="Enter name ..."
											className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										/>
										<ErrorMessage
											name="name"
											component="div"
											className="text-red-600 text-sm"
										/>
									</div>
									<div className="space-y-[6px]">
										<label className="text-sm font-medium">Client</label>
										<Field
											as="select"
											name="client"
											className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										>
											<option value="ACTIVE">ACTIVE</option>
											<option value="INACTIVE">INACTIVE</option>
										</Field>
										<ErrorMessage
											name="client"
											component="div"
											className="text-red-600 text-sm"
										/>
									</div>

									<div className="space-y-[6px]">
										<label className="text-sm font-medium">
											Choose contact
										</label>
										<MultiSelect name="contact" />

										<ErrorMessage
											name="contact"
											component="div"
											className="text-red-600 text-sm"
										/>
									</div>

									<div className="space-y-[6px]">
										<label className="text-sm font-medium">Status</label>
										<Field
											as="select"
											name="status"
											className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										>
											<option value="ACTIVE">ACTIVE</option>
											<option value="INACTIVE">INACTIVE</option>
										</Field>
										<ErrorMessage
											name="status"
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
