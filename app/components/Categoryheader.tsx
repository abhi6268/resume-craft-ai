import ScoreBadge from "./ScoreBadge";

type CategoryHeaderProps = {
    title: string;
    categoryScore: number;
};

const CategoryHeader = ({ title, categoryScore }: CategoryHeaderProps) => {
    return (
        <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">{title}</h3>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

export default CategoryHeader;