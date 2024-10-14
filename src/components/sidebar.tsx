"use client"

import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
	ArrowRightOnRectangleIcon,
	ClipboardDocumentCheckIcon,
	HomeModernIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

const navigation = [
	{
		title: "Dashboard",
		url: "/",
		icon: (
			<HomeModernIcon className="w-6 h-6 transition duration-75 group-hover:text-gray-900" />
		),
	},
	{
		title: "Surveys",
		url: "/dashboard/survey",
		icon: (
			<ClipboardDocumentCheckIcon className="w-6 h-6 transition duration-75 group-hover:text-gray-900" />
		),
	},
];

const SideBar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}  // Toggle sidebar
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>

			<aside
				id="sidebar-multi-level-sidebar"
				className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} w-72 sm:translate-x-0`}
				aria-label="Sidebar"
			>
				<div className="h-full overflow-y-auto ">
					<div className="px-3 py-4 rounded-tr-[32px] bg-survey-green">
						<div className="flex items-center justify-between">
							<XMarkIcon
								className="w-6 h-6 text-2xl text-white cursor-pointer"
								onClick={() => setIsOpen(false)}
							/>
						</div>
						<UserCircleIcon className="w-20 mx-auto text-white" />
						<h2 className="text-xl font-bold text-center text-survey-lighter">John Doe</h2>
						<div className="flex items-center justify-center">
							<span className="mr-2 text-xl text-lime-500">&#x2022;</span>
							<small className="text-xs text-white">Active</small>
						</div>
					</div>
					<div className="px-3 h-[calc(100vh_-_164px)] py-4 rounded-br-[32px] bg-survey-darkblue">
						<ul className="space-y-2">
							{navigation.map((item) => (
								<li key={item.title}>
									<Link
										href={item.url}
										className={
											"flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-100 hover:text-survey-darkblue"
										}
									>
										{item.icon}
										<span className="ml-3">{item.title}</span>
									</Link>
								</li>
							))}
							<li>
								<div
									className={
										"cursor-pointer mt-[calc(100vh_-_350px)] flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-100 hover:text-survey-darkblue"
									}

								>
									<ArrowRightOnRectangleIcon className="w-6 h-6 transition duration-75 group-hover:text-gray-900" />
									<span className="ml-3">{"logout"}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</aside>
		</>
	);
};

export default SideBar;
