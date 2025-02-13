"use client";
import LayoutForm from "@/components/form/layoutform";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	emailOrPhone: Yup.string().required("Email / Phone is required"),
});

const ForgotPassword = () => {

	const handleSubmit = (values: { emailOrPhone: string }) => {
		console.log(values);
	};

	return (
		<>
			<LayoutForm
				title="Start turning your ideas into reality."
				description="Create a free account and get full access to all features."
				side="right"
			>
				<div className="mx-auto lg:w-96 max-w-sm grid h-[calc(100vh_-_120px)]">
					<div className="grid self-start" />
					<div className="grid self-center space-y-20">
						<Image
							src={"/assets/icons/bongasms-logo.png"}
							width={195}
							height={64}
							alt="BongaSMS logo"
							className="mx-auto"
						/>
						<div>
							<h2 className="mb-3 text-4xl font-semibold text-dark">Forgot Password</h2>
							<p className="text-base text-gray-600 font-normal mb-8">
								Please enter your email or phone number that we may send to you an OTP.
							</p>
							<Formik
								initialValues={{
									emailOrPhone: "",
									password: "",
								}}
								onSubmit={handleSubmit}
								validationSchema={validationSchema}
							>
								<Form className="space-y-5">
									<div>
										<label className="text-sm text-gray-700 font-medium">
											Email / phone
										</label>
										<Field
											id="emailOrPhone"
											name="emailOrPhone"
											placeholder="Enter your email/phone"
											className="appearance-none block w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-500 placeholder-gray-500 placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
										/>
										<span className="text-red-500 text-sm">
											<ErrorMessage
												name="emailOrPhone"
												className=" text-red-500 text-sm"
											/>
										</span>
									</div>

									<div className="flex justify-start">
										<Link
											href="/auth/signin"
											className="text-sm font-semibold text-primary"
										>
											Remembered Password?
										</Link>
									</div>
									<Button
										variant={"default"}
										type="submit"
										className="w-full flex justify-center py-3 px-4 mb-8 border border-transparent rounded-lg shadow-sm text-base font-semibold focus:outline-none"
									>
										Send Request Link
									</Button>
									<div className="w-full inline-flex justify-center">
										<p className="mr-2 text-sm font-normal">
											Dont have an account?
										</p>{" "}
										<Link
											href="/auth/signup"
											className="text-sm font-semibold text-primary"
										>
											Sign up
										</Link>
									</div>
								</Form>
							</Formik>
						</div>
					</div>
					<div className="grid self-end" />
				</div>
			</LayoutForm>
		</>
	);
};

export default ForgotPassword;
