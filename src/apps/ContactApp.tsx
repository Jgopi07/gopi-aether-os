import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

function analyze(msg: string) {
  const lower = msg.toLowerCase();
  const urgent = /urgent|asap|immediately|today|tomorrow/.test(lower);
  const recruiter = /hire|hiring|role|interview|opportunity|recruit|position|job/.test(lower);
  const professionalism = Math.min(100, 60 + Math.min(40, msg.length / 4));
  const category = recruiter ? "Recruiter" : /freelance|project|build/.test(lower) ? "Client" : "General";
  return { urgent, recruiter, professionalism: Math.round(professionalism), category };
}

export function ContactApp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const a = analyze(msg);

 const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !email || !msg) {
    return toast.error("All fields required");
  }

  try {
    setSending(true);

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: name,
        email: email,
        message: msg,
        time: new Date().toLocaleString(),
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    toast.success(
      "[SIGNAL] Transmission complete · message delivered"
    );

    setName("");
    setEmail("");
    setMsg("");
  } catch (error) {
    console.error(error);

    toast.error(
      "[ERROR] Transmission failed"
    );
  } finally {
    setSending(false);
  }
};

  return (
    <div className="grid md:grid-cols-5 gap-5">
      <form onSubmit={submit} className="md:col-span-3 glass rounded-xl p-4 space-y-3">
        <div className="text-xs font-mono text-cyan/80">› contact.link // open_channel</div>
        <Field label="OPERATOR" v={name} set={setName} placeholder="Your name" />
        <Field label="UPLINK" v={email} set={setEmail} placeholder="you@domain.com" type="email" />
        <div>
          <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-1">TRANSMISSION</div>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={5}
            placeholder="Type your message..."
            className="w-full bg-background/40 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan focus:glow-cyan transition resize-none font-mono"
          />
        </div>
        <button disabled={sending} className="w-full glass-strong rounded-lg py-2.5 text-sm font-display tracking-widest text-cyan hover:glow-cyan transition flex items-center justify-center gap-2 disabled:opacity-50">
          <Send className="h-4 w-4" /> {sending ? "TRANSMITTING..." : "SEND SIGNAL"}
        </button>
      </form>

      <div className="md:col-span-2 space-y-4">
        <div className="glass rounded-xl p-4">
          <div className="text-[10px] font-mono text-cyan tracking-widest mb-2">AI MESSAGE ANALYZER</div>
          <Bar label="Professionalism" v={msg ? a.professionalism : 0} />
          <Bar label="Urgency" v={msg && a.urgent ? 90 : msg ? 30 : 0} color="warning" />
          <Bar label="Recruiter Priority" v={msg && a.recruiter ? 95 : msg ? 40 : 0} color="purple" />
          <div className="text-xs font-mono mt-2">Category: <span className="text-cyan">{msg ? a.category : "—"}</span></div>
        </div>

        <div className="glass rounded-xl p-4 space-y-2 text-sm">
          <a href="mailto:gopijangili123@gmail.com" className="flex items-center gap-2 hover:text-cyan"><Mail className="h-4 w-4" /> gopijangili123@gmail.com</a>
          <a href="https://github.com/Jgopi07" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan"><Github className="h-4 w-4" /> Jgopi07</a>
          <a href="https://www.linkedin.com/in/gopi-varma-3123302bb/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan"><Linkedin className="h-4 w-4" /> LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, v, set, placeholder, type = "text" }: { label: string; v: string; set: (s: string) => void; placeholder: string; type?: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-1">{label}</div>
      <input type={type} value={v} onChange={(e) => set(e.target.value)} placeholder={placeholder}
        className="w-full bg-background/40 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan focus:glow-cyan transition font-mono" />
    </div>
  );
}

function Bar({ label, v, color = "cyan" }: { label: string; v: number; color?: "cyan" | "warning" | "purple" }) {
  const c = color === "warning" ? "var(--warning-red)" : color === "purple" ? "var(--purple-glow)" : "var(--neon-cyan)";
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[10px] font-mono"><span>{label}</span><span style={{ color: c }}>{v}%</span></div>
      <div className="h-1 bg-white/5 rounded mt-1 overflow-hidden">
        <div className="h-full transition-all duration-500" style={{ width: `${v}%`, background: c, boxShadow: `0 0 8px ${c}` }} />
      </div>
    </div>
  );
}
