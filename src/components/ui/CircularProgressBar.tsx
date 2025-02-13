// components/CircularProgressBar.tsx
import React from "react";

interface CircularProgressBarProps {
	progress: number; // progress as a value between 0 and 1
	text: string;
	variant?: "base" | "small";
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
	progress,
	text,
	variant = "base",
}) => {
	const circumference = 2 * Math.PI * 45;

	return (
		<div className="relative flex items-center justify-center">
			{variant === "small" ? (
				<>
					<svg className="rotate-[-90deg]" width="50" height="50">
						<circle
							cx="25"
							cy="25"
							r="22.5"
							strokeWidth="5"
							className="text-gray-200"
							stroke="currentColor"
							fill="transparent"
						/>
						<circle
							cx="25"
							cy="25"
							r="22.5"
							strokeWidth="5"
							className="text-blue-500"
							stroke="currentColor"
							fill="transparent"
							strokeDasharray={circumference}
							strokeDashoffset={circumference - progress * circumference}
							strokeLinecap="round"
						/>
					</svg>

					<div className="absolute text-blue-500 text-xs">{text}</div>
				</>
			) : (
				<>
					<svg className="rotate-[-90deg]" width="100" height="100">
						<circle
							cx="50"
							cy="50"
							r="45"
							strokeWidth="10"
							className="text-gray-200"
							stroke="currentColor"
							fill="transparent"
						/>
						<circle
							cx="50"
							cy="50"
							r="45"
							strokeWidth="10"
							className="text-blue-500"
							stroke="currentColor"
							fill="transparent"
							strokeDasharray={circumference}
							strokeDashoffset={circumference - progress * circumference}
							strokeLinecap="round"
						/>
					</svg>

					<div className="absolute text-blue-500 text-sm">{text}</div>
				</>
			)}
		</div>
	);
};

export default CircularProgressBar;
