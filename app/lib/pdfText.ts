export async function extractPdfText(file: File): Promise<string> {
    // Ensure this only runs in the browser
    if (typeof window === "undefined") return "";

    // Dynamic imports so Vite SSR doesn't evaluate pdfjs in Node
    const pdfjsLib = await import("pdfjs-dist");
    const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;

    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerUrl;

    const buf = await file.arrayBuffer();
    const pdf = await (pdfjsLib as any).getDocument({ data: buf }).promise;

    let fullText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const strings = content.items
            .map((it: any) => ("str" in it ? it.str : ""))
            .filter(Boolean);
        fullText += strings.join(" ") + "\n";
    }

    return fullText.trim();
}