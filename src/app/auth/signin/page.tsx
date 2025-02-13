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
	password: Yup.string().required("Password is required"),
});

const Signin = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);

	const togglePassword = () => setPasswordVisible(!passwordVisible);

	const handleSubmit = (values: { emailOrPhone: string; password: string }) => {
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
							<h2 className="mb-3 text-4xl font-semibold text-dark">Sign in</h2>
							<p className="mb-8 text-base font-normal text-gray-600">
								Welcome! Please enter your details.
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
										<label className="text-sm font-medium text-gray-700">
											Email / phone
										</label>
										<Field
											id="emailOrPhone"
											name="emailOrPhone"
											placeholder="Enter your email/phone"
											className="block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
										/>
										<span className="text-sm text-red-500">
											<ErrorMessage
												name="emailOrPhone"
												className="text-sm text-red-500 "
											/>
										</span>
									</div>
									<div>
										<label className="text-sm font-medium text-gray-700">
											Password
										</label>
										<div className="relative">
											<Field
												id="password"
												name="password"
												placeholder="Enter your password"
												type={passwordVisible ? "text" : "password"}
												className="relative block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
											/>
											<button className="absolute bottom-3 right-3">
												{passwordVisible ? (
													<EyeIcon
														onClick={togglePassword}
														className="w-5 h-5 text-sm text-gray-500"
													/>
												) : (
													<EyeOffIcon
														onClick={togglePassword}
														className="w-5 h-5 text-sm text-gray-500"
													/>
												)}
											</button>
										</div>
										<span className="text-sm text-red-500 ">
											<ErrorMessage name="password" />
										</span>
									</div>

									<div className="flex justify-start">
										<Link
											href="/auth/forgotpassword"
											className="text-sm font-semibold text-primary"
										>
											Forgot Password?
										</Link>
									</div>
									<Button
										variant={"default"}
										type="submit"
										className="flex justify-center w-full px-4 py-3 mb-8 text-base font-semibold border border-transparent rounded-lg shadow-sm focus:outline-none"
									>
										Sign in
									</Button>
									<div className="inline-flex justify-center w-full">
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

export default Signin;
