"use client";
import LayoutForm from "@/components/form/layoutform";
import StepLabel from "@/components/form/stepLabel";
import { Button } from "@/components/ui/button";
import { Transition } from "@headlessui/react";
import {
	ErrorMessage,
	Field,
	Form,
	Formik,
	FormikErrors,
	FormikTouched,
} from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

interface FormValues {
	orgName: string;
	orgPhone: string;
	orgEmail: string;
	adminName: string;
	adminPhone: string;
	adminEmail: string;
	password: string;
	confirmPassword: string;
}

const initialValues: FormValues = {
	orgName: "",
	orgPhone: "",
	orgEmail: "",
	adminName: "",
	adminPhone: "",
	adminEmail: "",
	password: "",
	confirmPassword: "",
};

const validationSchema = Yup.object().shape({
	orgName: Yup.string().required("Organization name is required"),
	orgPhone: Yup.string().required("Organization Phone Number is requried"),
	orgEmail: Yup.string()
		.email("Organization Email must be a valid email")
		.required("Organization Email is required"),
	adminName: Yup.string().required("Admin name is required"),
	adminPhone: Yup.string().required("Admin Phone Number is requried"),
	adminEmail: Yup.string()
		.email("Admin Email must be a valid email")
		.required("Admin Email is required"),
	password: Yup.string().required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Password is required"),
});

const constantValues = [
	{
		containerTitle: "Welcome to bonga",
		formTitle: "Organization Details",
		stepTitle: "Step 1: Organisation details",
		description: "Name of organisation, phone no, email",
	},
	{
		containerTitle: "You can do so much more with Bonga",
		formTitle: "Administrator Details",
		stepTitle: "Step 2: Admin Details",
		description: "Name, phone no, email",
	},
	{
		containerTitle: "Give the best services to clients with Bonga",
		formTitle: "Set up a password",
		stepTitle: "Step 3: Set up password",
		description: "Must be at least 6 characters.",
	},
];
const Signin = () => {
	const [form, setForm] = useState<0 | 1 | 2 | number>(0);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	const togglePassword = () => setPasswordVisible(!passwordVisible);

	const toggleConfirmPassword = () =>
		setConfirmPasswordVisible(!confirmPasswordVisible);

	const handleFormStep = (step: number) => {
		if (step < 3) {
			setForm(step);
		}
	};

	function RenderForm(
		touched: FormikTouched<FormValues>,
		errors: FormikErrors<FormValues>
	) {
		switch (form) {
			case 0:
				return (
					<>
						<div>
							<label className="text-sm font-medium text-gray-700">
								Name of organisation
							</label>
							<Field
								id="orgName"
								name="orgName"
								placeholder="Enter your organisation"
								className="block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							/>
							{errors.orgName && touched.orgName ? (
								<span id="orgName" className="text-sm text-red-500">
									<ErrorMessage id="orgName" name="orgName" />
								</span>
							) : null}
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">
								Phone Number
							</label>
							<Field
								id="orgPhone"
								name="orgPhone"
								placeholder="Enter your phone number"
								className="block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							/>
							{errors.orgPhone && touched.orgPhone ? (
								<span className="text-sm text-red-500">
									<ErrorMessage id="orgPhone" name="orgPhone" />
								</span>
							) : null}
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">Email</label>
							<Field
								id="orgEmail"
								name="orgEmail"
								placeholder="Enter your email"
								type="email"
								className="block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							/>
							{errors.orgEmail && touched.orgEmail ? (
								<span className="text-sm text-red-500">
									<ErrorMessage id="orgEmail" name="orgEmail" />
								</span>
							) : null}
						</div>
					</>
				);

			case 1:
				return (
					<>
						<div>
							<label className="text-sm font-medium text-gray-700">Name</label>
							<Field
								id="adminName"
								name="adminName"
								placeholder="Enter your name"
								className="block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							/>
							{errors.adminName && touched.adminName ? (
								<span className="text-sm text-red-500">
									<ErrorMessage id="adminName" name="adminName" />
								</span>
							) : null}
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">
								Phone Number
							</label>
							<Field
								id="adminPhone"
								name="adminPhone"
								placeholder="Enter your phone number"
								className="block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							/>
							{errors.adminPhone && touched.adminPhone ? (
								<span className="text-sm text-red-500">
									<ErrorMessage id="adminPhone" name="adminPhone" />
								</span>
							) : null}
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">Email</label>
							<Field
								id="adminEmail"
								name="adminEmail"
								placeholder="Enter your email"
								type="email"
								className="block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							/>
							{errors.adminEmail && touched.adminEmail ? (
								<span className="text-sm text-red-500">
									<ErrorMessage id="adminEmail" name="adminEmail" />
								</span>
							) : null}
						</div>
					</>
				);

			case 2:
				return (
					<>
						<div>
							<label className="text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="relative">
								<Field
									id="password"
									name="password"
									placeholder="Enter a password"
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
								{errors.password && touched.password ? (
									<span className="text-sm text-red-500">
										<ErrorMessage id="password" name="password" />
									</span>
								) : null}
						</div>
						<div>
							<label className="text-sm font-medium text-gray-700">
								Confirm Password
							</label>
							<div className="relative">
								<Field
									id="confirmPassword"
									name="confirmPassword"
									placeholder="Confirm your password"
									type={confirmPasswordVisible ? "text" : "password"}
									className="relative block w-full px-3 py-3 mt-2 text-gray-500 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm appearance-none placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								/>
								<button className="absolute bottom-3 right-3">
									{confirmPasswordVisible ? (
										<EyeIcon
											onClick={toggleConfirmPassword}
											className="w-5 h-5 text-sm text-gray-500"
										/>
									) : (
										<EyeOffIcon
											onClick={toggleConfirmPassword}
											className="w-5 h-5 text-sm text-gray-500"
										/>
									)}
								</button>
							</div>
								{errors.confirmPassword && touched.confirmPassword ? (
									<span className="text-sm text-red-500">
										<ErrorMessage id="confirmPassword" name="confirmPassword" />
									</span>
								) : null}
						</div>
					</>
				);
			default:
				return null;
		}
	}

	const handleSubmit = (values: FormValues) => {
		console.log(values);
	};

	function handleNextStep(
		values: FormValues,
		validateField: (
			field: string
		) => Promise<void> | Promise<string | undefined>,
		setTouched: (
			touched: import("formik").FormikTouched<FormValues>,
			shouldValidate?: boolean | undefined
		) => Promise<void | import("formik").FormikErrors<FormValues>>,
		errors: FormikErrors<FormValues>
	) {
		switch (form) {
			case 0:
				if (
					form === 0 &&
					(!values.orgName || !values.orgEmail || !values.orgPhone)
				) {
					validateField("orgName");
					validateField("orgEmail");
					validateField("orgPhone");
					setTouched({
						orgName: true,
						orgEmail: true,
						orgPhone: true,
					});
				} else if (
					form == 0 &&
					!errors.orgName &&
					!errors.orgEmail &&
					!errors.orgPhone
				) {
					setForm(form + 1);
				}
				break;
			case 1:
				if (
					form === 1 &&
					(!values.adminName || !values.adminEmail || !values.adminPhone)
				) {
					setTouched({
						adminName: true,
						adminEmail: true,
						adminPhone: true,
					});
				} else if (
					form == 1 &&
					!errors.adminName &&
					!errors.adminEmail &&
					!errors.adminPhone
				) {
					setForm(form + 1);
				}
			case 2:
				if (form === 2 && (!values.password || !values.confirmPassword)) {
					setTouched({
						password: true,
						confirmPassword: true,
					});
				}
		}
	}

	return (
		<>
			<LayoutForm
				title={constantValues[form].containerTitle}
				description="Please take time to create your account by filling in the details in the form to your right."
			>
				<div className="mx-auto grid min-h-[calc(100vh_-_120px)]">
					<div className="grid self-start" />
					<div className="grid self-center space-y-10 md:space-y-20">
						<Image
							src={"/assets/icons/bongasms-logo.png"}
							width={195}
							height={64}
							alt="BongaSMS logo"
							className="mx-auto"
						/>
						<div className="mx-auto lg:w-96 md:max-w-sm ">
							<h2 className="mb-3 text-4xl font-semibold text-dark">
								{constantValues[form].formTitle}
							</h2>
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
								}) => (
									<Form className="space-y-5">
										{RenderForm(touched, errors)}
										<Transition
											as={"div"}
											show={form < 1}
											enter="transition-opacity duration-300"
											enterFrom="opacity-0"
											enterTo="opacity-100"
											leave="transition-opacity duration-150"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<Button
												type="button"
												variant={"default"}
												className="flex justify-center w-full px-4 py-3 mb-8 text-base font-semibold border border-transparent rounded-lg shadow-sm focus:outline-none"
												onClick={() =>
													handleNextStep(
														values,
														validateField,
														setTouched,
														errors
													)
												}
											>
												Next
											</Button>
										</Transition>
										<Transition
											as={"div"}
											show={form > 0}
											enter="transition-opacity duration-300"
											enterFrom="opacity-0"
											enterTo="opacity-100"
											leave="transition-opacity duration-150"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
											className={"flex justify-between gap-x-4"}
										>
											<Button
												type="button"
												className="flex justify-center w-1/2 px-4 py-3 mb-8 text-base font-semibold border border-transparent rounded-lg shadow-sm focus:outline-none"
												onClick={() => handleFormStep(form - 1)}
											>
												Back
											</Button>
											<Button
												variant={"default"}
												type={
													values.password && values.confirmPassword
														? "submit"
														: "button"
												}
												className="flex justify-center w-1/2 px-4 py-3 mb-8 text-base font-semibold border border-transparent rounded-lg shadow-sm focus:outline-none"
												onClick={() =>
													handleNextStep(
														values,
														validateField,
														setTouched,
														errors
													)
												}
											>
												{form === 2 ? "Finish" : "Next"}
											</Button>
										</Transition>
										<div className="inline-flex justify-center w-full">
											<p className="mr-2 text-sm font-normal">
												Dont have an account?
											</p>{" "}
											<Link
												href="/auth/signin"
												className="text-sm font-semibold text-primary"
											>
												Sign in
											</Link>
										</div>
									</Form>
								)}
							</Formik>
						</div>

						<div className="inline-flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
							{constantValues.map((item, index) => (
								<StepLabel
									title={item.stepTitle}
									description={item.description}
									key={item.formTitle}
									complete={index < form}
									disable={form === index}
								/>
							))}
						</div>
					</div>
					<div className="grid self-end" />
				</div>
			</LayoutForm>
		</>
	);
};

export default Signin;
