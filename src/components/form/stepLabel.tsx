"use client";

import React from "react";

interface StepLabelProps {
	complete: boolean;
	disable: boolean;
	title: string;
	description: string;
}

const StepLabel = ({
	complete,
	disable,
	title,
	description,
}: StepLabelProps) => {
	return (
		<div className="flex flex-col items-center space-x-2 sm:flex-row sm:items-start">
			<div>
				<img src={complete ? "/checked.png" : "/step_icon_base.svg"} className="min-w-[31px]" alt="Step Icon" />
			</div>
			<div>
				<h1 className={`${disable ? 'text-active': 'text-dark-gray'}  text-xs font-semibold text-nowrap `}>{title}</h1>
				<p className={`${disable ? 'text-active': 'text-dark-gray'} hidden sm:flex text-xs  font-normal text-gray-600 max-w-[164px]`}>
					{description}
				</p>
			</div>
		</div>
	);
};

export default StepLabel;
