"use client"

import { useState } from 'react';

// Define the type for a single question
type Question = {
  type: 'open' | 'closed';
  question: string;
  options: string[];  // Make sure options are always an array of strings
};

export default function CreateSurvey() {
  // Initialize state with typed questions array
  const [questions, setQuestions] = useState<Question[]>([
    { type: 'open', question: '', options: [] },
  ]);

  const handleAddOption = (index: number) => {
    const newQuestions = [...questions];
    if (newQuestions[index].type === 'closed') {
      newQuestions[index].options.push(''); // Add empty string for a new option
      setQuestions(newQuestions);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: 'open', question: '', options: [] }]);
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
    newQuestions[qIndex].type = e.target.value as 'open' | 'closed';
    newQuestions[qIndex].options = e.target.value === 'closed' ? ['', ''] : [];
    setQuestions(newQuestions);
  };

  return (
    <>
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-lg p-8 mx-auto bg-white rounded-md shadow-md">
        <h1 className="mb-6 text-xl font-bold">Create Survey</h1>

        {/* Survey Title */}
        <div className="mb-6">
          <label className="block text-gray-700">Survey Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border rounded-md"
            placeholder="Enter Title"
          />
        </div>

        {/* Survey Time and Description */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700">Start Time</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div>
            <label className="block text-gray-700">End Time</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md"
              placeholder="dd/mm/yyyy"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full px-4 py-2 mt-2 border rounded-md"
            placeholder="Text Here"
          />
        </div>

        {/* Dynamic Question Creation */}
        <h2 className="mb-4 text-lg font-bold">Create Questions</h2>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-6">
            <label className="block text-gray-700">Question Type</label>
            <select
              value={q.type}
              onChange={(e) => handleQuestionTypeChange(e, qIndex)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
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

            {q.type === 'closed' && (
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
                <button
                  type="button"
                  className="mt-2 text-blue-500"
                  onClick={() => handleAddOption(qIndex)}
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md"
          onClick={handleAddQuestion}
        >
          + Add Question
        </button>

        <button
          type="submit"
          className="px-4 py-2 mt-4 ml-2 text-white bg-teal-500 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
    </>
  );
}
