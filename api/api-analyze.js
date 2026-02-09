import 'dotenv/config';

const AIResponseFormat = `
interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: { type: "good" | "improve"; tip: string; }[];
  };
  toneAndStyle: {
    score: number;
    tips: { type: "good" | "improve"; tip: string; explanation: string; }[];
  };
  content: {
    score: number;
    tips: { type: "good" | "improve"; tip: string; explanation: string; }[];
  };
  structure: {
    score: number;
    tips: { type: "good" | "improve"; tip: string; explanation: string; }[];
  };
  skills: {
    score: number;
    tips: { type: "good" | "improve"; tip: string; explanation: string; }[];
  };
}`;

function prepareInstructions({ jobTitle, jobDescription }) {
    return `You are an expert in ATS (Applicant Tracking System) and resume analysis.
Please analyze and rate this resume and suggest how to improve it.
The rating can be low if the resume is bad.
Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
If available, use the job description for the job user is applying to to give more detailed feedback.
If provided, take the job description into consideration.
The job title is: ${jobTitle}
The job description is: ${jobDescription}
Provide the feedback using the following format:
${AIResponseFormat}
Return the analysis as an JSON object, without any other text and without the backticks.
Do not include any other text or comments.`;
}

async function callOpenAI(prompt) {
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
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1200,
            temperature: 0.7,
        }),
    });

    const raw = await res.text();
    if (!res.ok) throw new Error(`OpenAI request failed (${res.status}): ${raw}`);

    const data = JSON.parse(raw);
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content in OpenAI response");

    try {
        const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
        return JSON.parse(cleanedContent);
    } catch (parseErr) {
        console.error("Failed to parse OpenAI response as JSON:", content);
        throw new Error("OpenAI returned invalid JSON format");
    }
}

// Vercel Serverless Function Handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    try {
        const { resumeText, jobTitle, jobDescription } = req.body;

        // Validation
        if (!resumeText || typeof resumeText !== 'string') {
            return res.status(400).json({ ok: false, error: 'Missing or invalid resumeText' });
        }
        if (!jobTitle || typeof jobTitle !== 'string') {
            return res.status(400).json({ ok: false, error: 'Missing or invalid jobTitle' });
        }
        if (!jobDescription || typeof jobDescription !== 'string') {
            return res.status(400).json({ ok: false, error: 'Missing or invalid jobDescription' });
        }

        // Build prompt
        const prompt = prepareInstructions({ jobTitle, jobDescription }) + 
                      `\n\nRESUME TEXT (extracted):\n${resumeText}`;

        console.log('Calling OpenAI API...');
        const feedback = await callOpenAI(prompt);
        console.log('Got feedback from OpenAI');

        return res.status(200).json({ ok: true, feedback });

    } catch (error) {
        console.error('Error in /api/analyze:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Analysis failed'
        });
    }
}
