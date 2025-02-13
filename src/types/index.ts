interface QuestionProps {
    text: string;
    type: "free-text" | "multiple-choice";
    options?: string[];
}

interface FormValuesProps {
    questions: QuestionProps[];
}
