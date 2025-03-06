import React from "react";

interface Step {
    id: number;
    label: string;
}

interface StepNavigationProps {
    steps: Step[];
    currentStep: number;
    onStepClick: (step: number) => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ steps, currentStep, onStepClick }) => {
    return (
        <div className="flex lg:ml-12 items-center lg:bg-white lg:p-4 lg:rounded-lg lg:shadow">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    {/* Step Number */}
                    <div
                        className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors cursor-pointer
                            ${
                            currentStep === index
                                ? "bg-blue-600 text-white border-2 border-blue-600"
                                : "bg-white text-gray-500 border-2 border-gray-300"
                        }`}
                        onClick={() => onStepClick(index)}
                    >
                        {step.id}
                    </div>

                    {/* Step Label */}
                    <span
                        className={`ml-2 text-sm font-medium ${
                            currentStep === index ? "text-blue-600" : "text-gray-500"
                        }`}
                    >
                        {step.label}
                    </span>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                        <div
                            className={`w-8 lg:w-10 h-[2px] ${
                                currentStep > index ? "bg-blue-600" : "bg-gray-300"
                            }`}
                            onClick={() => onStepClick(index)}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StepNavigation;