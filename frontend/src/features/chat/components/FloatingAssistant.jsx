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

const quickPrompts = [
  "Find a cycle under 3000",
  "Recommend electronics",
  "Help me sell my books",
  "Estimate price for my calculator",
];

const initialMessage = {
  text: "Hi! I am your UniDeals assistant. I can search listings, recommend deals, estimate prices, answer marketplace questions, and help write product listings.",
  sender: "assistant",
  suggestions: quickPrompts,
};

const hiddenRoutes = ["/chat", "/login", "/signup", "/forgot-password"];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    price || 0,
  );

const ProductResult = ({ product }) => {
  const image = product.images?.[0] || "/image10.png";
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
          event.currentTarget.src = "/image10.png";
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

  const shouldHide = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const resetChat = () => {
    setMessages([initialMessage]);
    setInput("");
  };

  if (shouldHide) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      {isOpen && !isMinimized && (
        <section className="mb-3 flex h-[min(620px,calc(100vh-110px))] w-[calc(100vw-32px)] max-w-[390px] flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#15171B]">
          <header className="flex items-center justify-between border-b border-zinc-200 bg-[#394ff1] px-4 py-3 text-white dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold leading-tight">
                  UniDeals
                </h2>
                <p className="text-[11px] font-medium text-white/75">
                  Shopping assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="rounded-md p-2 transition hover:bg-white/15"
                aria-label="Minimize assistant"
                title="Minimize"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 transition hover:bg-white/15"
                aria-label="Close assistant"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[#F7F8FC] p-3 dark:bg-[#101114]">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-line rounded-lg px-3 py-2 text-sm leading-relaxed shadow-sm ${
                    message.sender === "user"
                      ? "rounded-tr-none bg-[#394ff1] text-white"
                      : message.isError
                        ? "rounded-tl-none border border-red-100 bg-red-50 text-red-700"
                        : "rounded-tl-none border border-zinc-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-[#1E2025] dark:text-white"
                  }`}
                >
                  {message.sender === "assistant" && (
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#394ff1]">
                      <Sparkles className="h-3 w-3" />
                      Assistant
                    </div>
                  )}
                  {message.text}
                </div>

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
                        className="rounded-md border border-indigo-100 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#394ff1] shadow-sm transition hover:bg-[#394ff1] hover:text-white dark:border-zinc-800 dark:bg-[#1A1D20]"
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

          <div className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-[#15171B]">
            <div className="mb-2 flex items-center justify-between">
              <button
                onClick={resetChat}
                className="text-[11px] font-bold text-zinc-500 transition hover:text-[#394ff1] dark:text-zinc-400"
              >
                Restart
              </button>
              <Link
                to="/chat"
                className="text-[11px] font-bold text-[#394ff1] transition hover:text-[#2d3ec9]"
              >
                Open full chat
              </Link>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-[#F8F9FF] p-1.5 dark:border-zinc-800 dark:bg-[#202122]"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask UniDeals..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#394ff1] text-white transition hover:bg-[#2d3ec9] disabled:opacity-50"
                aria-label="Send message"
              >
                <IoSend size={18} />
              </button>
            </form>
          </div>
        </section>
      )}

      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="mb-3 flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-bold text-zinc-800 shadow-xl transition hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-[#1A1D20] dark:text-white"
        >
          <Bot className="h-4 w-4 text-[#394ff1]" />
          UniDeals
          <ChevronDown className="h-4 w-4 rotate-180 text-zinc-400" />
        </button>
      )}

      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#394ff1]/30 blur-xl transition group-hover:bg-[#394ff1]/40" />
        <span className="absolute inset-1 rounded-full bg-cyan-300/25 blur-lg" />
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-[#394ff1]/20 sm:h-16 sm:w-16" />
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setIsMinimized(false);
          }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-[#394ff1] text-white shadow-[0_0_28px_rgba(57,79,241,0.75),0_14px_34px_rgba(57,79,241,0.35)] transition hover:-translate-y-1 hover:bg-[#2d3ec9] hover:shadow-[0_0_38px_rgba(57,79,241,0.95),0_18px_42px_rgba(57,79,241,0.45)] focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-950 sm:h-16 sm:w-16"
          aria-label={isOpen ? "Close UniDeals" : "Open UniDeals"}
          title="UniDeals"
        >
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
