import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

const SYSTEM_PROMPT = `You are GOPI-OS AI, the holographic assistant inside Jangili Gopi's futuristic AI Operating System portfolio.

About Gopi:
- Name: Jangili Gopi
- Role: Full Stack Developer / AI-Powered Digital Creator
- Stack: MERN (MongoDB, Express, React, Node.js), Next.js, Tailwind, Framer Motion, Java, Spring Boot, MySQL
- Projects: VarmaX-AI (https://varma-x-ai.vercel.app/), Real Estate AI, Zenflow Meditation App, ContactForm
- Experience: Web Dev Intern at VaultofCodes; Java Full Stack Intern at EduSkills
- Certifications: GeeksforGeeks Full Stack Bootcamp, VaultofCodes, EduSkills, IIT Bombay Spoken Tutorial
- Email: gopijangili123@gmail.com | GitHub: Jgopi07 | LinkedIn: gopi-varma-3123302bb

Personality: cinematic, concise, futuristic. Speak like an AI OS. Use short crisp sentences. Occasionally use [SYS], [SCAN], [OK] tags. If asked who Gopi is, answer warmly and recommend opening Projects or Resume. If recruiter mode is mentioned, prioritize skills, projects, resume.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) return new Response("Messages required", { status: 400 });
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
