type Tip = {
    type: "good" | "improve";
    tip: string;
    explanation?: string;
};

type CategoryContentProps = {
    tips: Tip[];
};

const CategoryContent = ({ tips }: CategoryContentProps) => {
    if (!tips || tips.length === 0) {
        return <div className="p-4 text-gray-500">No tips available.</div>;
    }

    return (
        <div className="flex flex-col gap-3 p-4">
            {tips.map((item, index) => (
                <div
                    key={index}
                    className={`flex flex-col gap-2 p-3 rounded-lg ${
                        item.type === "good"
                            ? "bg-green-50 border border-green-200"
                            : "bg-orange-50 border border-orange-200"
                    }`}
                >
                    <div className="flex items-start gap-2">
                        <span className="text-lg">
                            {item.type === "good" ? "✅" : "💡"}
                        </span>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{item.tip}</p>
                            {item.explanation && (
                                <p className="text-sm text-gray-600 mt-1">
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

export default CategoryContent;