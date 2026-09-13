import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bot,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  Minus,
  Sparkles,
  X,
} from "lucide-react";
import { IoSend } from "react-icons/io5";
import axiosInstance from "../../../services/axiosInstance.js";
import AssistantMessageText from "./AssistantMessageText.jsx";

const quickPrompts = [
  "Find a cycle under 3000",
  "Recommend electronics",
  "Help me sell my books",
  "How do I report a scam?",
  "How does boosting work?",
];

const initialMessage = {
  text: "Hi! I am your UniDeals assistant. I can search listings, recommend deals, estimate fair prices, write product listings, and answer platform questions.",
  sender: "assistant",
  suggestions: quickPrompts,
  sources: ["Unideals knowledge base"],
};

const hiddenRoutes = [
  "/chat",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/checkEmail",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    price || 0,
  );

const ProductResult = ({ product }) => {
  const image = product.images?.[0] || "/default-avatar.png";
  const category = product.categoryLabel || product.category?.replaceAll("_", " ");

  return (
    <Link
      to={`/product/${product._id}`}
      className="flex gap-2 rounded-lg border border-zinc-200 bg-white p-2 transition hover:border-[#394ff1]/50 dark:border-zinc-800 dark:bg-[#181A1E]"
    >
      <img
        src={image}
        alt={product.title}
        className="h-16 w-16 shrink-0 rounded-md object-cover"
        onError={(event) => {
          event.currentTarget.src = "/default-avatar.png";
        }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-xs font-bold text-zinc-900 dark:text-white">
            {product.title}
          </h3>
          <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-zinc-400" />
        </div>
        <p className="mt-1 text-[11px] capitalize text-zinc-500 dark:text-zinc-400">
          {category}
        </p>
        <p className="mt-1 text-sm font-black text-[#394ff1]">
          Rs {formatPrice(product.selling_price)}
        </p>
      </div>
    </Link>
  );
};

const FloatingAssistant = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const shouldHide = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  useEffect(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, [location.pathname]);

  const sendMessage = async (text) => {
    const messageText = text.trim();
    if (!messageText || isTyping) return;

    const history = messages.slice(-8).map((message) => ({
      sender: message.sender,
      text: message.text,
    }));

    setMessages((prev) => [
      ...prev,
      {
        text: messageText,
        sender: "user",
      },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const { data } = await axiosInstance.post("/api/chat/assistant", {
        message: messageText,
        history,
      });

      const assistantData = data?.data;

      setMessages((prev) => [
        ...prev,
        {
          text: assistantData.reply,
          sender: "assistant",
          intent: assistantData.intent,
          products: assistantData.products || [],
          suggestions: assistantData.suggestions || [],
          sources: assistantData.sources || [],
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text:
            error.response?.data?.message ||
            "I could not reach the assistant right now. Please try again.",
          sender: "assistant",
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([initialMessage]);
    setInput("");
  };

  if (shouldHide) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      {isOpen && !isMinimized && (
        <section className="pointer-events-auto mb-4 flex h-[min(680px,calc(100vh-112px))] w-[calc(100vw-32px)] max-w-[430px] flex-col overflow-hidden rounded-[22px] border border-white/70 bg-white/92 shadow-[0_28px_90px_rgba(17,24,39,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#111318]/95">
          <header className="relative flex items-center justify-between overflow-hidden border-b border-white/15 bg-[linear-gradient(135deg,#2637d9_0%,#7748ed_52%,#11a7e8_100%)] px-4 py-4 text-white">
            <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 left-10 h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl" />
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/16 shadow-inner">
                <span className="absolute inset-0 rounded-2xl bg-white/15 blur-md" />
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold leading-tight">
                  UniDeals Assistant
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/82">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.95)]" />
                  Gemini powered marketplace guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="rounded-xl p-2 transition hover:bg-white/15"
                aria-label="Minimize assistant"
                title="Minimize"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 transition hover:bg-white/15"
                aria-label="Close assistant"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(57,79,241,0.12),transparent_34%),linear-gradient(180deg,#F8FAFF_0%,#EEF4FF_100%)] px-4 py-4 dark:bg-[radial-gradient(circle_at_top_left,rgba(57,79,241,0.18),transparent_34%),linear-gradient(180deg,#101114_0%,#171A20_100%)]">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-3 text-sm leading-relaxed shadow-sm ${
                    message.sender === "user"
                      ? "rounded-tr-md bg-[linear-gradient(135deg,#394ff1,#7357f4)] text-white shadow-[0_10px_24px_rgba(57,79,241,0.22)]"
                      : message.isError
                        ? "rounded-tl-md border border-red-100 bg-red-50 text-red-700"
                        : "rounded-tl-md border border-white/80 bg-white text-zinc-800 shadow-[0_12px_30px_rgba(30,41,59,0.08)] dark:border-zinc-800 dark:bg-[#1E2025] dark:text-white"
                  }`}
                >
                  {message.sender === "assistant" && (
                    <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#394ff1]">
                      <Sparkles className="h-3 w-3" />
                      Assistant
                    </div>
                  )}
                  <AssistantMessageText text={message.text} />
                </div>

                {!!message.sources?.length && (
                  <div className="mt-1.5 flex max-w-[88%] flex-wrap gap-1.5">
                    {message.sources.map((source) => (
                      <span
                        key={source}
                        className="rounded-full border border-indigo-100 bg-white/85 px-2.5 py-1 text-[10px] font-semibold text-[#394ff1] shadow-sm dark:border-zinc-800 dark:bg-[#1A1D20]"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                )}

                {!!message.products?.length && (
                  <div className="mt-2 grid w-full gap-2">
                    {message.products.slice(0, 4).map((product) => (
                      <ProductResult key={product._id} product={product} />
                    ))}
                  </div>
                )}

                {!!message.suggestions?.length && (
                  <div className="mt-2 flex max-w-full flex-wrap gap-2">
                    {message.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="rounded-xl border border-indigo-100 bg-white/90 px-3 py-2 text-[11px] font-bold text-[#394ff1] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#394ff1] hover:text-white dark:border-zinc-800 dark:bg-[#1A1D20]"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-[11px] text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-[#1E2025]">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-[#394ff1]" />
                Assistant is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-zinc-200/80 bg-white/95 p-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-[#15171B]/95">
            <div className="mb-3 flex items-center justify-between">
              <button
                onClick={resetChat}
                className="rounded-lg px-2 py-1 text-[11px] font-bold text-zinc-500 transition hover:bg-zinc-100 hover:text-[#394ff1] dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Restart
              </button>
              <Link
                to="/chat"
                className="rounded-lg px-2 py-1 text-[11px] font-bold text-[#394ff1] transition hover:bg-indigo-50 hover:text-[#2d3ec9] dark:hover:bg-zinc-800"
              >
                Open full chat
              </Link>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative z-20 flex items-end gap-2 rounded-2xl border border-zinc-200 bg-[#F8F9FF] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(15,23,42,0.08)] focus-within:border-[#394ff1]/55 focus-within:ring-4 focus-within:ring-[#394ff1]/10 dark:border-zinc-800 dark:bg-[#202122]"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask UniDeals..."
                rows={1}
                className="max-h-24 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-5 text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#394ff1,#8b7cf6)] text-white shadow-[0_10px_22px_rgba(57,79,241,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(57,79,241,0.36)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
                aria-label="Send message"
              >
                <IoSend size={20} />
              </button>
            </form>
          </div>
        </section>
      )}

      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto mb-3 flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/95 px-3 py-2 text-sm font-bold text-zinc-800 shadow-xl backdrop-blur transition hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-[#1A1D20]/95 dark:text-white"
        >
          <Bot className="h-4 w-4 text-[#394ff1]" />
          UniDeals
          <ChevronDown className="h-4 w-4 rotate-180 text-zinc-400" />
        </button>
      )}

      <div className="floating-assistant-orb pointer-events-auto group relative flex h-[76px] w-[76px] items-center justify-center">
        <span className="assistant-aura assistant-aura-primary" />
        <span className="assistant-aura assistant-aura-secondary" />
        <span className="assistant-aura assistant-aura-ring" />
        <span className="assistant-particle left-2 top-3 h-1.5 w-1.5" />
        <span className="assistant-particle right-3 top-5 h-1 w-1" />
        <span className="assistant-particle bottom-4 left-5 h-1 w-1" />
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setIsMinimized(false);
          }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-[linear-gradient(135deg,#394ff1_0%,#6d28d9_58%,#14b8d6_100%)] text-white shadow-[0_0_34px_rgba(57,79,241,0.82),0_18px_40px_rgba(57,79,241,0.36)] transition hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(124,58,237,0.95),0_22px_48px_rgba(57,79,241,0.48)] focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-950"
          aria-label={isOpen ? "Close UniDeals" : "Open UniDeals"}
          title="UniDeals"
        >
          <span className="absolute inset-2 rounded-full bg-white/10 blur-sm" />
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6 transition group-hover:scale-110" />
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingAssistant;
