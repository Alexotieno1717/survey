import NotFound from "../notfound/notFound";
import SurveyCard from "@/components/survey/SurveyCard";

const SurveyList = () => {
    // Explicitly type the array as an array of objects with the correct status type
    const surveys: Array<{
        title: string;
        status: 'Active' | 'Inactive' | 'Finished';
        responses: number;
        date: string;
    }> = [
        { title: 'Customer Satisfaction Survey 2024', status: 'Active', responses: 20, date: '23/04/25' },
        { title: 'Customer Satisfaction Survey 2024', status: 'Inactive', responses: 20, date: '23/04/25' },
        { title: 'Customer Satisfaction Survey 2024', status: 'Finished', responses: 20, date: '23/04/25' },
    ];

    return (
        <div className="pt-6">
            {surveys.length > 0 ? (
                surveys.map((survey, index) => (
                    <SurveyCard
                        key={index}
                        title={survey.title}
                        status={survey.status}
                        responses={survey.responses}
                        date={survey.date}
                    />
                ))
            ) : (
                <NotFound title="survey" pathToCreate="/dashboard/survey/create" />
            )}
        </div>

    );
};

export default SurveyList;
