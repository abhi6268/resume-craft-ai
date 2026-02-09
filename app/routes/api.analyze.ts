import "dotenv/config";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { prepareInstructions } from "../../constants";

type AnalyzeRequest = {
    resumeText: string;
    jobTitle: string;
    jobDescription: string;
};

function jsonResponse(data: unknown, init?: ResponseInit) {
    return new Response(JSON.stringify(data), {
        status: init?.status ?? 200,
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    });
}

function isAnalyzeRequest(x: any): x is AnalyzeRequest {
    return (
        x &&
        typeof x === "object" &&
        typeof x.resumeText === "string" &&
        typeof x.jobTitle === "string" &&
        typeof x.jobDescription === "string"
    );
}

async function callOpenAI(prompt: string) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 1200,
            temperature: 0.7,
        }),
    });

    const raw = await res.text();
    if (!res.ok) throw new Error(`OpenAI request failed (${res.status}): ${raw}`);

    const data = JSON.parse(raw);
    
    // Extract the actual response content
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
        throw new Error("No content in OpenAI response");
    }

    // Try to parse the JSON from the response
    try {
        const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
        return JSON.parse(cleanedContent);
    } catch (parseErr) {
        console.error("Failed to parse OpenAI response as JSON:", content);
        throw new Error("OpenAI returned invalid JSON format");
    }
}

export async function loader(_args: LoaderFunctionArgs) {
    return jsonResponse({ ok: false, error: "Use POST" }, { status: 405 });
}

export async function action({ request }: ActionFunctionArgs) {
    try {
        const body = await request.json();

        if (!isAnalyzeRequest(body)) {
            return jsonResponse(
                { ok: false, error: "Invalid payload. Expected resumeText, jobTitle, jobDescription." },
                { status: 400 }
            );
        }

        const { resumeText, jobTitle, jobDescription } = body;

        const prompt =
            prepareInstructions({ jobTitle, jobDescription }) +
            `\n\nRESUME TEXT (extracted):\n${resumeText}`;

        const feedback = await callOpenAI(prompt);

        return jsonResponse({ ok: true, feedback });
    } catch (err: any) {
        console.error("Analyze error:", err);
        return jsonResponse(
            { ok: false, error: err?.message ?? "Analyze failed" },
            { status: 500 }
        );
    }
}