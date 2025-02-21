export interface QuestionProps {
    question: string;
    responseType: "free-text" | "multiple-choice";
    options: string[];
    allowMultiple: boolean;
    freeTextDescription: "", // New field for free-text explanation
}



export interface CompletionMessageProps{
    completionMessage?: string;
}

export interface ValuesProps{
    surveyName: string;
    description: string;
    startDate: string;
    endDate: string;
    triggerWord: string;
    completionMessage?: string;
}
