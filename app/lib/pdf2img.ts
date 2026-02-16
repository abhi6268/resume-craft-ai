export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
        // Safer worker wiring for Vite-ish builds:
        // put pdf.worker.min.mjs in /public and keep this path
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfjsLib = lib;
        return lib;
    });

    return loadPromise;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        // Start reasonable
        const initialScale = 1.6;
        let viewport = page.getViewport({ scale: initialScale });

        // Cap width so it never becomes huge
        const MAX_WIDTH = 900; // tweak 800-1000
        const scale = viewport.width > MAX_WIDTH ? (MAX_WIDTH / viewport.width) * initialScale : initialScale;
        viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) {
            return { imageUrl: "", file: null, error: "No canvas context" };
        }

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        await page.render({ canvasContext: context, viewport }).promise;

        return await new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        resolve({ imageUrl: "", file: null, error: "Failed to create image blob" });
                        return;
                    }

                    const originalName = file.name.replace(/\.pdf$/i, "");
                    const imageFile = new File([blob], `${originalName}.jpg`, { type: "image/jpeg" });

                    resolve({
                        imageUrl: URL.createObjectURL(blob),
                        file: imageFile,
                    });
                },
                "image/jpeg",
                0.72
            );
        });
    } catch (err: any) {
        return { imageUrl: "", file: null, error: `Failed to convert PDF: ${err?.message || String(err)}` };
    }
}