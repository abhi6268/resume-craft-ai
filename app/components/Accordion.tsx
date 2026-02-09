import { createContext, useContext, useState, ReactNode } from "react";

type AccordionContextType = {
    openItems: string[];
    toggleItem: (id: string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an Accordion");
    }
    return context;
};

type AccordionProps = {
    children: ReactNode;
    defaultOpen?: string[];
};

const Accordion = ({ children, defaultOpen = [] }: AccordionProps) => {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

    const toggleItem = (id: string) => {
        setOpenItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem }}>
            <div className="space-y-4 w-full">{children}</div>
        </AccordionContext.Provider>
    );
};

export const AccordionItem = ({ id, children }: { id: string; children: ReactNode }) => {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            {children}
        </div>
    );
};

export const AccordionHeader = ({ itemId, children }: { itemId: string; children: ReactNode }) => {
    const { openItems, toggleItem } = useAccordion();
    const isOpen = openItems.includes(itemId);

    return (
        <button
            onClick={() => toggleItem(itemId)}
            className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        >
            {children}
            <div className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </button>
    );
};

export const AccordionContent = ({ itemId, children }: { itemId: string; children: ReactNode }) => {
    const { openItems } = useAccordion();
    const isOpen = openItems.includes(itemId);

    return (
        <div
            className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
            <div className="border-t border-gray-200">{children}</div>
        </div>
    );
};

export default Accordion;
