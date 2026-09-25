import { AnimatePresence, motion } from "motion/react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { chatbotFaqs } from "@/data/content";
import { api } from "@/data/api";
import { useSiteContent } from "@/store/site-content";

type Message = { id: string; from: "bot" | "user"; text: string };

const quickReplies = ["What services do you offer?", "Pricing?", "How long does a project take?"];

function answerFor(input: string) {
  const text = input.toLowerCase();
  const match = chatbotFaqs.find((faq) => faq.keywords.some((keyword) => text.includes(keyword)));
  return (
    match?.answer ??
    "Great question. Leave your name and email below and a Drawvax specialist will get back to you within two business hours."
  );
}

export function Chatbot() {
  const { addLead } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [input, setInput] = useState("");
  const [lead, setLead] = useState({ name: "", email: "" });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      from: "bot",
      text: "Hi, I'm Vax — the Drawvax Infotech assistant. Ask me about our services, pricing or timelines.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setWelcomed(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = { id: `u${Date.now()}`, from: "user", text };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `b${Date.now()}`, from: "bot", text: answerFor(text) },
      ]);
    }, 600);
  };

  const submitLead = async (event: FormEvent) => {
    event.preventDefault();
    if (!lead.name.trim() || !lead.email.includes("@")) {
      toast.error("Please add your name and a valid email.");
      return;
    }
    // TODO: connect to backend — persist chatbot lead
    const saved = await api.submitChatLead({
      ...lead,
      message: messages.filter((m) => m.from === "user").map((m) => m.text).join(" | ") || "Chat enquiry",
    });
    addLead(saved);
    setLead({ name: "", email: "" });
    setMessages((current) => [
      ...current,
      { id: `b${Date.now()}`, from: "bot", text: `Thanks ${saved.name}! Our team will email you shortly.` },
    ]);
    toast.success("Details received — we'll be in touch.");
  };

  return (
    <>
      <AnimatePresence>
        {welcomed && !open ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass fixed right-6 bottom-24 z-50 max-w-[15rem] rounded-2xl px-4 py-3 text-sm"
          >
            <p className="font-medium">Need help choosing a service?</p>
            <p className="mt-1 text-xs text-muted-foreground">Chat with Vax — it takes 30 seconds.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Open chat"
        onClick={() => {
          setOpen((value) => !value);
          setWelcomed(false);
        }}
        className="gradient-accent fixed right-6 bottom-6 z-[70] grid size-14 place-items-center rounded-full text-primary-foreground"
        animate={{ boxShadow: [
          "0 0 0 0 color-mix(in oklab, var(--primary) 55%, transparent)",
          "0 0 0 16px color-mix(in oklab, var(--primary) 0%, transparent)",
        ] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass fixed right-4 bottom-24 z-[70] flex h-[30rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b border-border/60 p-4">
              <span className="gradient-accent grid size-9 place-items-center rounded-xl text-primary-foreground">
                <Bot className="size-4.5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Vax Assistant</p>
                <p className="text-[11px] text-muted-foreground">Typically replies instantly</p>
              </div>
            </div>

            <div ref={scrollRef} className="hide-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={
                    message.from === "user"
                      ? "gradient-accent ml-auto max-w-[80%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm text-primary-foreground"
                      : "glass-soft max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm"
                  }
                >
                  {message.text}
                </motion.div>
              ))}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => send(reply)}
                    className="glass-soft rounded-full px-3 py-1.5 text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <form onSubmit={submitLead} className="glass-soft mt-2 space-y-2 rounded-2xl p-3">
                <p className="text-[11px] text-muted-foreground">
                  Want a follow-up? Leave your details.
                </p>
                <input
                  value={lead.name}
                  onChange={(event) => setLead({ ...lead, name: event.target.value })}
                  placeholder="Name"
                  className="w-full rounded-lg bg-input/60 px-3 py-2 text-xs outline-none"
                />
                <input
                  value={lead.email}
                  onChange={(event) => setLead({ ...lead, email: event.target.value })}
                  placeholder="Email"
                  className="w-full rounded-lg bg-input/60 px-3 py-2 text-xs outline-none"
                />
                <button className="gradient-accent w-full rounded-lg py-2 text-xs font-semibold text-primary-foreground">
                  Request callback
                </button>
              </form>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border/60 p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type a message..."
                className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                className="gradient-accent grid size-9 shrink-0 place-items-center rounded-lg text-primary-foreground"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
