"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import * as Yup from "yup";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import DatePicker from "@/components/common/DatePicker";
import {
	Description,
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useRouter } from 'next/navigation'

interface ValuesProps {
	title: string;
	description: string;
	triggerword: string;
	finalResponse: string;
	clientId: string;
	status: string;
	startDate: string;
	endDate: string;
}

// Validation schema
const validationSchema = Yup.object({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	triggerWord: Yup.string().required("Trigger Word is required"),
	finalResponse: Yup.string().required("Final Response is required"),
	clientId: Yup.string().required("Client ID is required"),
	status: Yup.string().required("Status is required"),
	startDate: Yup.string().required("Start Date is required"),
	endDate: Yup.string().required("End Date is required"),
});

export default function Page() {
	const router = useRouter()
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
			<div className="fixed inset-0 flex items-center justify-center w-screen p-4">
				{/* The actual dialog panel  */}
				<DialogPanel className="p-6 space-y-4 bg-white rounded-xl">
					<div className="flex items-center justify-between">
						<DialogTitle className="font-bold">Create Survey</DialogTitle>
						<Button variant="outline" size="icon" onClick={() => router.back()}>
							<X className="w-5 h-5" />
						</Button>
					</div>

					<Description>Enter details to create survey</Description>

					<hr className="mt-6" />
					<Formik<ValuesProps>
						initialValues={{
							title: "",
							description: "",
							triggerword: "",
							finalResponse: "",
							clientId: "",
							status: "",
							startDate: "",
							endDate: "",
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values }) => (
							<Form>
								<div className="space-y-[13px]">
									<div className="grid grid-cols-2 gap-x-5">
										<div>
											<div className="space-y-[6px] mb-3">
												<label className="text-sm text">Title</label>
												<Field
													type="text"
													name="title"
													placeholder="Enter Title ..."
													className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												/>
												<ErrorMessage
													name="title"
													component="div"
													className="text-sm text-red-600"
												/>
											</div>
											<div className="space-y-[6px] mb-3">
												<label className="text-sm text">Description</label>
												<Field
													as="textarea"
													name="description"
													placeholder="Enter description ..."
													cols={30}
													rows={5}
													className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												/>
												<ErrorMessage
													name="description"
													component="div"
													className="text-sm text-red-600"
												/>
											</div>
										</div>
										<div>
											<div className="space-y-[6px] mb-3">
												<label className="text-sm text">Trigger Word</label>
												<Field
													type="text"
													name="triggerword"
													placeholder="Enter Trigger Word ..."
													cols={30}
													rows={5}
													className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												/>
												<ErrorMessage
													name="triggerword"
													component="div"
													className="text-sm text-red-600"
												/>
											</div>
											<div className="space-y-[6px] mb-3">
												<label className="text-sm text">Final Response</label>
												<Field
													as="textarea"
													name="finalResponse"
													placeholder="Enter description ..."
													cols={30}
													rows={5}
													className="w-full border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												/>
												<ErrorMessage
													name="finalResponse"
													component="div"
													className="text-sm text-red-600"
												/>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-x-5">
										<div>
											<div className="space-y-[6px] mb-3">
												<label className="text-sm font-medium">client ID</label>
												<Field
													as="select"
													name="clientId"
													className="w-full h-10 border border-input bg-background px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
												>
													<option value="">Client 1</option>
													<option value="1">Client 2</option>
													<option value="2">Client 3</option>
													<option value="3">Client 4</option>
												</Field>
												<ErrorMessage
													name="clientId"
													component="div"
													className="text-sm text-red-600"
												/>
											</div>
											<div className="space-y-[6px] mb-3">
												<label className="text-sm text">Start Date</label>
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
													className="text-sm text-red-600"
												/>
											</div>
										</div>
										<div>
											<div className="space-y-[6px] mb-3">
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
													className="text-sm text-red-600"
												/>
											</div>
											<div className="space-y-[6px] mb-3">
												<label className="text-sm text">End Date</label>
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
														<DatePicker name="endDate" />
													</PopoverContent>
												</Popover>
												<ErrorMessage
													name="endDate"
													component="div"
													className="text-sm text-red-600"
												/>
											</div>
										</div>
									</div>
								</div>
								<hr className="mt-3" />
								<div className="flex items-end justify-end pt-[17px] space-x-3">
									<Button variant="outline" onClick={() => router.back()}>Cancel</Button>
									<Button type="submit">Create Survey</Button>
								</div>
							</Form>
						)}
					</Formik>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
