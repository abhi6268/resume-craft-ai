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

const NEW_KEY = "resumecraft:resumes";
const OLD_KEY = "resumind:resumes";

function safeParse<T>(raw: string | null, fallback: T): T {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}

function migrateIfNeeded() {
    if (typeof window === "undefined") return;

    const existingNew = safeParse<StoredResume[]>(localStorage.getItem(NEW_KEY), []);
    if (existingNew.length > 0) return;

    const oldData = safeParse<StoredResume[]>(localStorage.getItem(OLD_KEY), []);
    if (oldData.length === 0) return;

    localStorage.setItem(NEW_KEY, JSON.stringify(oldData));
    // Optional: remove old key after migration
    // localStorage.removeItem(OLD_KEY);
}

export const storage = {
    list(): StoredResume[] {
        if (typeof window === "undefined") return [];
        migrateIfNeeded();
        return safeParse<StoredResume[]>(localStorage.getItem(NEW_KEY), []);
    },

    get(id: string): StoredResume | undefined {
        return storage.list().find((r) => r.id === id);
    },

    upsert(item: StoredResume) {
        const all = storage.list();
        const idx = all.findIndex((r) => r.id === item.id);
        if (idx >= 0) all[idx] = item;
        else all.unshift(item);
        localStorage.setItem(NEW_KEY, JSON.stringify(all));
    },

    remove(id: string) {
        const all = storage.list().filter((r) => r.id !== id);
        localStorage.setItem(NEW_KEY, JSON.stringify(all));
    },

    wipe() {
        localStorage.setItem(NEW_KEY, JSON.stringify([]));
        // Optional: also wipe old key
        // localStorage.setItem(OLD_KEY, JSON.stringify([]));
    },
};