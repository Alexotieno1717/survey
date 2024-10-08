"use client";

import { SetStateAction, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

// Define the type for a single question
type Question = {
  type: "open" | "closed";
  question: string;
  options: string[];
};

export default function CreateSurvey() {
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([
    { type: "open", question: "", options: [] },
  ]);

  const [surveyData, setSurveyData] = useState({
    surveyName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const SurveySchema = Yup.object().shape({
    surveyName: Yup.string().required("Survey name is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleAddOption = (index: number) => {
    const newQuestions = [...questions];
    if (newQuestions[index].type === "closed") {
      newQuestions[index].options.push(""); // Add empty string for a new option
      setQuestions(newQuestions);
    }
  };

  const handleDeleteOption = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1); // Remove the selected option
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const lastQuestionType = questions[questions.length - 1].type;
    const newQuestion: Question =
      lastQuestionType === "closed"
        ? { type: "closed", question: "", options: ["", ""] } // Default 2 options for closed questions
        : { type: "open", question: "", options: [] }; // Open questions have no options

    setQuestions([...questions, newQuestion]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    if (oIndex >= 0) {
      newQuestions[qIndex].options[oIndex] = e.target.value;
    } else {
      newQuestions[qIndex].question = e.target.value;
    }
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].type = e.target.value as "open" | "closed";
    newQuestions[qIndex].options = e.target.value === "closed" ? ["", ""] : [];
    setQuestions(newQuestions);
  };

  const handleSurveySubmit = (values: SetStateAction<{ surveyName: string; startDate: string; endDate: string; description: string; }>) => {
    // Update survey data with form values
    setSurveyData(values);

    // Proceed to next step
    setStep(2);
  };

  const handleFinalSubmit = () => {
    const finalData = {
      ...surveyData,
      questions: questions,
    };

    // Log the entire survey and questions data to the console
    console.log(finalData);
  };

  return (
    <div className="md:p-10">
      <div className="p-8 bg-white rounded-md shadow-md">
        <h1 className="mb-6 text-2xl md:text-4xl font-bold">
          {step === 1 ? "Create Survey" : "Create Questions"}
        </h1>

        {step === 1 && (
          <Formik
            initialValues={{
              surveyName: surveyData.surveyName,
              startDate: surveyData.startDate,
              endDate: surveyData.endDate,
              description: surveyData.description,
            }}
            validationSchema={SurveySchema}
            onSubmit={handleSurveySubmit}
          >
            {() => (
              <Form>
                <div className="mb-6">
                  <label className="block text-gray-700">Survey Name</label>
                  <Field
                    name="surveyName"
                    type="text"
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    placeholder="Enter Title"
                  />
                  <ErrorMessage name="surveyName" component="div" className="text-red-500" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700">Start Time</label>
                    <Field
                      name="startDate"
                      type="date"
                      className="w-full px-4 py-2 mt-2 border rounded-md"
                    />
                    <ErrorMessage name="startDate" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label className="block text-gray-700">End Time</label>
                    <Field
                      name="endDate"
                      type="date"
                      className="w-full px-4 py-2 mt-2 border rounded-md"
                    />
                    <ErrorMessage name="endDate" component="div" className="text-red-500" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700">Description</label>
                  <Field
                    name="description"
                    as="textarea"
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    placeholder="Text Here"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500" />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 mt-4 text-white rounded-md bg-survey-green"
                >
                  Next
                </button>
              </Form>
            )}
          </Formik>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-4 text-lg font-bold">Create Questions</h2>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-6">
                <label className="block text-gray-700">Question Type</label>
                <select
                  value={q.type}
                  onChange={(e) => handleQuestionTypeChange(e, qIndex)}
                  className="w-full h-10 border border-input bg-white px-3 py-2 text-sm rounded-[8px] ring-offset-background placeholder-text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="open">Open Question</option>
                  <option value="closed">Closed Question</option>
                </select>

                <label className="block mt-4 text-gray-700">Question</label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleInputChange(e, qIndex, -1)}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                  placeholder="Text Here"
                />

                {q.type === "closed" && (
                  <div className="mt-4">
                    <label className="block text-gray-700">Options</label>
                    {q.options.map((opt, oIndex) => (
                      <input
                        key={oIndex}
                        type="text"
                        value={opt}
                        onChange={(e) => handleInputChange(e, qIndex, oIndex)}
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        placeholder={`Option ${oIndex + 1}`}
                      />
                    ))}

                    <div className="flex space-x-6">
                      <button
                        type="button"
                        className="flex items-center space-x-1 mt-4 text-blue-500 text-sm"
                        onClick={() => handleAddOption(qIndex)}
                      >
                        <PlusCircleIcon className="w-5 h-5" /> <span>Add Option</span>
                      </button>

                      <button
                        type="button"
                        className="flex items-center space-x-1 mt-4 text-red-400 text-sm"
                        onClick={() =>
                          handleDeleteOption(qIndex, q.options.length - 1)
                        }
                      >
                        <TrashIcon className="w-4 h-4" /> <span>Delete Option</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div>
              <button
                type="button"
                className="flex px-2 py-2 mt-4 rounded-md space-x-2 text-blue-400"
                onClick={handleAddQuestion}
              >
                <PlusCircleIcon className="w-5 h-5" /> 
                <span>Add Question</span>
              </button>
            </div>

            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 mt-4 rounded-md bg-white border"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-4 py-2 mt-4 ml-2 text-white rounded-md bg-survey-green"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
