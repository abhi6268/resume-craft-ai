import Accordion, {
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";
import type { Feedback } from "../../constants";

const CategoryContent = ({ tips }: { tips: any[] }) => {
    if (!tips || tips.length === 0) {
        return <div className="p-6 text-gray-500">No tips available.</div>;
    }

    return (
        <div className="p-6 space-y-4 bg-gray-50">
            {tips.map((item, index) => (
                <div
                    key={index}
                    className={`p-5 rounded-xl border ${
                        item.type === "good"
                            ? "bg-green-50 border-green-200"
                            : "bg-orange-50 border-orange-200"
                    }`}
                >
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            {item.type === "good" ? (
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className={`font-semibold mb-1 ${
                                item.type === "good" ? "text-green-900" : "text-orange-900"
                            }`}>
                                {item.tip}
                            </p>
                            {item.explanation && (
                                <p className={`text-sm ${
                                    item.type === "good" ? "text-green-700" : "text-orange-700"
                                }`}>
                                    {item.explanation}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const CategoryHeader = ({ title, categoryScore, icon }: { title: string; categoryScore: number; icon: string }) => {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
        if (score >= 60) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (score >= 40) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        return 'bg-red-100 text-red-700 border-red-200';
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <div className={`px-4 py-2 rounded-xl font-bold text-sm border ${getScoreColor(categoryScore)}`}>
                {categoryScore}/100
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    const f = feedback?.feedback ?? feedback;

    if (!f) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="text-gray-500 text-center">No details available.</div>
            </div>
        );
    }

    const tone = f.toneAndStyle ?? { score: 0, tips: [] };
    const content = f.content ?? { score: 0, tips: [] };
    const structure = f.structure ?? { score: 0, tips: [] };
    const skills = f.skills ?? { score: 0, tips: [] };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Detailed Feedback
            </h2>

            <Accordion defaultOpen={["tone-style", "content"]}>
                <AccordionItem id="tone-style">
                    <AccordionHeader itemId="tone-style">
                        <CategoryHeader title="Tone & Style" categoryScore={tone.score} icon="✍️" />
                    </AccordionHeader>
                    <AccordionContent itemId="tone-style">
                        <CategoryContent tips={tone.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="content">
                    <AccordionHeader itemId="content">
                        <CategoryHeader title="Content" categoryScore={content.score} icon="📝" />
                    </AccordionHeader>
                    <AccordionContent itemId="content">
                        <CategoryContent tips={content.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="structure">
                    <AccordionHeader itemId="structure">
                        <CategoryHeader title="Structure" categoryScore={structure.score} icon="🏗️" />
                    </AccordionHeader>
                    <AccordionContent itemId="structure">
                        <CategoryContent tips={structure.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="skills">
                    <AccordionHeader itemId="skills">
                        <CategoryHeader title="Skills" categoryScore={skills.score} icon="💪" />
                    </AccordionHeader>
                    <AccordionContent itemId="skills">
                        <CategoryContent tips={skills.tips} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;
