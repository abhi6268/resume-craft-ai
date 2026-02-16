export type StoredResume = {
    id: string;
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    fileName: string;
    createdAt: number;

    resumeText: string;
    imageDataUrl?: string;
    feedback?: any;
};

const KEY = "resumecraft:resumes"; // ← updated

function safeParse<T>(raw: string | null, fallback: T): T {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}

export const storage = {
    list(): StoredResume[] {
        if (typeof window === "undefined") return [];
        return safeParse<StoredResume[]>(localStorage.getItem(KEY), []);
    },

    get(id: string): StoredResume | undefined {
        return storage.list().find((r) => r.id === id);
    },

    upsert(item: StoredResume) {
        const all = storage.list();
        const idx = all.findIndex((r) => r.id === item.id);

        if (idx >= 0) all[idx] = item;
        else all.unshift(item);

        localStorage.setItem(KEY, JSON.stringify(all));
    },

    remove(id: string) {
        const all = storage.list().filter((r) => r.id !== id);
        localStorage.setItem(KEY, JSON.stringify(all));
    },

    wipe() {
        localStorage.setItem(KEY, JSON.stringify([]));
    },
};