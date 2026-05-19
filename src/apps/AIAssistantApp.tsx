import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  parts: { type: "text"; text: string }[];
};

const QUICK = [
  "Who is Gopi?",
  "Show top projects",
  "Explain Gopi OS",
  "Show MERN stack experience",
  "List certifications",
  "Open recruiter mode",
  "Show AI projects",
  "What technologies does Gopi use?",
];

export function AIAssistantApp() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [status, setStatus] = useState<
    "ready" | "submitted" | "streaming"
  >("ready");

  const endRef = useRef<HTMLDivElement>(null);

  const busy =
    status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, status]);

  const generateReply = (question: string) => {
    const q = question.toLowerCase();

    // WHO
    if (
      q.includes("who is gopi") ||
      q.includes("who are you") ||
      q.includes("about gopi")
    ) {
      return `
Jangili Gopi is a Full Stack Developer and AI-powered digital creator focused on futuristic UI systems and immersive web experiences.

Specializations:
• MERN Stack Development
• AI-enhanced Interfaces
• Futuristic UI Engineering
• Responsive Systems
• Interactive Web Experiences
      `;
    }

    // PROJECTS
    if (
      q.includes("project") ||
      q.includes("top projects")
    ) {
      return `
Featured Projects:

🚀 Gopi OS
Futuristic AI-powered portfolio operating system with holographic UI and interactive terminal.

🤖 VarmaX AI
AI-powered futuristic platform with immersive interaction systems.

🏡 Real Estate AI
AI-enhanced real estate browsing platform with responsive architecture.

🧘 Zenflow Meditation App
Cinematic wellness application with immersive UI systems.

📝 MERN Notes App
JWT-authenticated full stack CRUD application.
      `;
    }

    // GOPI OS
    if (
      q.includes("gopi os") ||
      q.includes("portfolio")
    ) {
      return `
Gopi OS is a cinematic futuristic portfolio inspired by advanced operating systems.

Features:
• AI Assistant
• Interactive Terminal
• Holographic Windows
• Responsive Mobile + Desktop UI
• Animated Background Systems
• Neural Interface Design
• Cinematic User Experience

Tech Stack:
React • TypeScript • Tailwind • Framer Motion • Vite
      `;
    }

    // MERN
    if (
      q.includes("mern") ||
      q.includes("stack")
    ) {
      return `
MERN Stack Experience:

Frontend:
• React.js
• Next.js
• Tailwind CSS
• Framer Motion

Backend:
• Node.js
• Express.js

Database:
• MongoDB
• MySQL

Systems:
• JWT Authentication
• REST APIs
• CRUD Operations
      `;
    }

    // CERTIFICATIONS
    if (
      q.includes("certification") ||
      q.includes("certificate")
    ) {
      return `
Top Certifications:

🏆 UiPath RPA Developer Virtual Internship
🏆 AI & Prompt Engineering Internship
🏆 Full Stack Developer Bootcamp
🏆 Cybersecurity Essentials
🏆 Kubernetes Certification
🏆 Docker Certification
🏆 Git Training Certification
🏆 IIT Bombay Programming Certifications
      `;
    }

    // EXPERIENCE
    if (
      q.includes("experience") ||
      q.includes("internship")
    ) {
      return `
Experience Overview:

💼 Java Full Stack Developer Intern
EduSkills

💼 AI & Prompt Engineering Intern
VaultofCodes

💼 Web Development Intern
VaultofCodes

Focus Areas:
• Full Stack Systems
• AI Workflows
• UI Engineering
• Responsive Design
      `;
    }

    // TECHNOLOGIES
    if (
      q.includes("technologies") ||
      q.includes("skills")
    ) {
      return `
Technologies Used:

Frontend:
React.js • Next.js • Tailwind CSS • Framer Motion

Backend:
Node.js • Express.js

Databases:
MongoDB • MySQL • PostgreSQL

Languages:
Java • JavaScript • TypeScript • Python

Tools:
Git • GitHub • Postman • VS Code • Vercel
      `;
    }

    // RECRUITER
    if (
      q.includes("recruiter")
    ) {
      return `
Recruiter Analysis:

✅ Strong Frontend Engineering
✅ MERN Stack Development
✅ AI-focused Systems
✅ Responsive Architecture
✅ Modern UI/UX Design
✅ Real-world Projects
✅ Full Stack Development Experience
✅ Futuristic Portfolio Branding

Recruiter Compatibility: HIGH
      `;
    }

    // AI
    if (
      q.includes("ai")
    ) {
      return `
AI Systems Overview:

• AI-powered UI concepts
• Prompt engineering workflows
• Intelligent interaction systems
• Adaptive neural assistant
• Futuristic digital experiences
• AI-enhanced portfolio architecture
      `;
    }

    // CONTACT
    if (
      q.includes("contact")
    ) {
      return `
Contact Information:

📧 Email:
gopijangili123@gmail.com

💻 GitHub:
github.com/Jgopi07

🔗 LinkedIn:
linkedin.com/in/gopi-varma-3123302bb
      `;
    }

    // GITHUB
    if (
      q.includes("github")
    ) {
      return `
GitHub Highlights:

• Gopi OS
• VarmaX AI
• Real Estate AI
• Zenflow Meditation App
• MERN Notes Application

GitHub:
https://github.com/Jgopi07
      `;
    }

    // DEFAULT
    return `
Neural assistant processed your request successfully.

You can ask about:
• Projects
• Experience
• Certifications
• Skills
• MERN Stack
• AI Systems
• Recruiter Overview
• Contact Information
    `;
  };

  const send = async (t: string) => {
    if (!t.trim() || busy) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [
        {
          type: "text",
          text: t.trim(),
        },
      ],
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setStatus("submitted");

    setTimeout(() => {
      setStatus("streaming");

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        parts: [
          {
            type: "text",
            text: generateReply(t),
          },
        ],
      };

      setMessages((prev) => [...prev, aiMessage]);

      setStatus("ready");
    }, 900);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <div className="relative h-8 w-8 rounded-full glass flex items-center justify-center glow-purple">
          <Sparkles className="h-4 w-4 text-purple-glow animate-pulse-glow" />
        </div>

        <div>
          <div className="font-display text-sm text-glow-cyan">
            GOPI-OS AI
          </div>

          <div className="text-[10px] font-mono text-muted-foreground">
            neural assistant · adaptive AI intelligence system
          </div>
        </div>

        <span className="ml-auto text-[10px] font-mono text-cyan flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
          ONLINE
        </span>
      </div>

      <div className="flex-1 overflow-auto py-3 space-y-3">
        <div className="text-center py-4">
  <div className="text-xs font-mono text-muted-foreground mb-3">
    Neural AI assistant online. Ask about projects, experience, certifications, or technical skills.
  </div>

  <div className="flex flex-wrap justify-center gap-2">
    {QUICK.map((q) => (
      <button
        key={q}
        onClick={() => send(q)}
        className="text-xs glass px-3 py-1.5 rounded-lg hover:glow-cyan transition"
      >
        {q}
      </button>
    ))}
  </div>
</div>

        {messages.map((m) => {
          const text = m.parts
            .map((p) =>
              p.type === "text" ? p.text : ""
            )
            .join("");

          const mine = m.role === "user";

          return (
            <div
              key={m.id}
              className={`flex ${
                mine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
                  mine
                    ? "glass-strong text-cyan"
                    : "glass"
                }`}
              >
                {text || (
                  <span className="text-muted-foreground italic">
                    thinking…
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="glass rounded-xl px-3 py-2 text-xs font-mono text-muted-foreground">
              [AI CORE] processing neural request...
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 pt-3 border-t border-border"
      >
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="ask about projects, skills, certifications..."
          disabled={busy}
          className="flex-1 bg-background/40 border border-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan focus:glow-cyan"
        />

        <button
          disabled={busy}
          className="glass-strong rounded-lg p-2 text-cyan hover:glow-cyan disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}