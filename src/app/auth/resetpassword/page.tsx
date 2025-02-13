"use client";
import LayoutForm from "@/components/form/layoutform";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";

interface FormValuesOtp {
	otp: string;
}

const initialValuesOtp: FormValuesOtp = {
	otp: "",
};

const validationSchemaOtp = Yup.object().shape({
	otp: Yup.string().required("OTP is required"),
});

interface FormValues {
	password: string;
	confirmPassword: string;
}

const initialValues: FormValues = {
	password: "",
	confirmPassword: "",
};

const validationSchema = Yup.object().shape({
	password: Yup.string().required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Password is required"),
});

const ResetPassword = () => {
	const [form, setForm] = useState<0 | 1 | number>(0);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	const togglePassword = () => setPasswordVisible(!passwordVisible);
	const toggleConfirmPassword = () =>
		setConfirmPasswordVisible(!confirmPasswordVisible);

	const handleSubmit = (values: FormValues) => {
		console.log(values);
	};
	const handleFormStep = (step: number) => {
		if (step < 3) {
			setForm(step);
		}
	};
    const handleSubmitOtp = (values: FormValuesOtp) => {
		handleFormStep(1)
	};
	function RenderForm() {
		switch (form) {
			case 0:
				return (
					<div>
						<h2 className="text-center mb-3 text-4xl font-semibold text-dark">
							Enter OTP
						</h2>
						<p className="text-center text-base text-gray-600 font-normal mb-8">
							Check your email or phone for OTP.
						</p>
						<Formik
							initialValues={initialValuesOtp}
							onSubmit={handleSubmitOtp}
							validationSchema={validationSchemaOtp}
						>
							<Form className="space-y-5">
								<div>
									<Field
										id="otp"
										name="otp"
										placeholder=""
										type={"text"}
										className="text-center appearance-none block w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-500 placeholder-gray-500 placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
									/>
									<span className=" text-red-500 text-sm">
										<ErrorMessage name="otp" />
									</span>
								</div>
								<Button
									variant={"default"}
									type="submit"
									className="w-full flex justify-center py-3 px-4 mb-8 border border-transparent rounded-lg shadow-sm text-base font-semibold focus:outline-none"
								>
									Continue
								</Button>
							</Form>
						</Formik>
					</div>
				);
			case 1:
				return (
					<div>
						<h2 className="text-center mb-3 text-4xl font-semibold text-dark">
							Reset Password
						</h2>
						<p className="text-center text-base text-gray-600 font-normal mb-8">
							Must be at least 6 characters.
						</p>
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={validationSchema}
						>
							<Form className="space-y-5">
								<div>
									<label className="text-sm text-gray-700 font-medium">
										New Password
									</label>
									<div className="relative">
										<Field
											id="password"
											name="password"
											placeholder="Enter your password"
											type={passwordVisible ? "password" : "text"}
											className="relative appearance-none block w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-500 placeholder-gray-500 placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
										/>
										<button className="absolute bottom-3 right-3">
											{passwordVisible ? (
												<EyeIcon
													onClick={togglePassword}
													className="text-sm w-5 h-5 text-gray-500"
												/>
											) : (
												<EyeOffIcon
													onClick={togglePassword}
													className="text-sm w-5 h-5 text-gray-500"
												/>
											)}
										</button>
									</div>
									<span className=" text-red-500 text-sm">
										<ErrorMessage name="password" />
									</span>
								</div>
								<div>
									<label className="text-sm text-gray-700 font-medium">
										Confirm New Password
									</label>
									<div className="relative">
										<Field
											id="confirmPassword"
											name="confirmPassword"
											placeholder="Confirm your password"
											type={confirmPasswordVisible ? "password" : "text"}
											className="relative appearance-none block w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-500 placeholder-gray-500 placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
										/>
										<button className="absolute bottom-3 right-3">
											{confirmPasswordVisible ? (
												<EyeIcon
													onClick={toggleConfirmPassword}
													className="text-sm w-5 h-5 text-gray-500"
												/>
											) : (
												<EyeOffIcon
													onClick={toggleConfirmPassword}
													className="text-sm w-5 h-5 text-gray-500"
												/>
											)}
										</button>
									</div>
									<span className=" text-red-500 text-sm">
										<ErrorMessage name="password" />
									</span>
								</div>
								<Button
									variant={"default"}
									type="submit"
									className="w-full flex justify-center py-3 px-4 mb-8 border border-transparent rounded-lg shadow-sm text-base font-semibold focus:outline-none"
								>
									Reset
								</Button>
							</Form>
						</Formik>
					</div>
				);
		}
	}
	return (
		<LayoutForm
			title="Start turning your ideas into reality."
			description="Reset your account credentials and get full access to all features."
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
					{RenderForm()}
				</div>
				<div className="grid self-end" />
			</div>
		</LayoutForm>
	);
};

export default ResetPassword;
