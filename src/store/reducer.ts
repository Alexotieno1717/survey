
export interface Question {
    id: string;
    question: string;
    responseType: "free-text" | "multiple-choice";
    options?: string[];
    allowMultiple?: boolean;
    freeTextDescription?: string;
}

interface State {
    questions: Question[];
}

type Action =
    | { type: "ADD_QUESTION"; payload: Question }
    | { type: "UPDATE_QUESTION"; id: string; payload: Partial<Question> }
    | { type: "REMOVE_QUESTION"; id: string };

export const questionReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_QUESTION":
            return { ...state, questions: [...state.questions, action.payload] };

        case "UPDATE_QUESTION":
            return {
                ...state,
                questions: state.questions.map((q) =>
                    q.id === action.id ? { ...q, ...action.payload } : q
                ),
            };

        case "REMOVE_QUESTION":
            return {
                ...state,
                questions: state.questions.filter((q) => q.id !== action.id),
            };

        default:
            return state;
    }
};
