"use client";

import { useState, useRef, useEffect } from "react";

import { Send, Sparkles, CheckCircle2, BookText } from "lucide-react";

import { analyzeGemchat } from "@/app/api/analyzeGemchat";
import { useEstateStore } from "@/shared/store/EstateStore";
import { GemType } from "@/shared/types/types";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const GemChat = () => {
  const isGemChatOpen = useEstateStore((state) => state.isGemChatOpen);
  const closeGemChat = useEstateStore((state) => state.closeGemChat);
  const estates = useEstateStore((state) => state.estates);
  const openModal = useEstateStore((state) => state.openModal);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<(GemType & { role: "user" | "ai" })[]>([
    {
      role: "ai",
      summary: "Hi! I'm Gem. Ask me anything about real estate or your data.",
      conclusion: "",
      sources: [],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();

    const newMessages = [
      ...messages,
      { role: "user" as const, summary: userMessage, conclusion: "", sources: [] },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const formattedMessages = newMessages.map((msg) => ({
        role: msg.role,
        content: msg.summary,
      }));

      const analysis = await analyzeGemchat(estates, formattedMessages);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          summary: analysis.summary,
          conclusion: analysis.conclusion || "",
          topPicks: analysis.topPicks,
          sources: analysis.sources || [],
        },
      ]);
    } catch (error) {
      console.error("GemChat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          summary: "Oops, I ran into an error analyzing the data. Please try again.",
          conclusion: "",
          sources: [],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeGemChat();
    }
  };

  return (
    <Dialog open={isGemChatOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="font-inter border-border/60 bg-background/25 flex h-[550px] w-[380px] flex-col overflow-hidden rounded-[32px] border p-0 shadow-2xl backdrop-blur-xl backdrop-saturate-150 sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Gemini Assistant Chat</DialogTitle>
          <DialogDescription>Chat with Gemini about real estate.</DialogDescription>
        </DialogHeader>

        <div className="border-border/50 bg-feature/5 flex shrink-0 items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-feature flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-foreground text-sm font-semibold">Gem Assistant</h3>
              <p className="text-muted-foreground text-[11px]">Powered by Gemini</p>
            </div>
          </div>
        </div>

        <ScrollArea className="min-h-0 w-full flex-1 [&>[data-radix-scroll-area-viewport]]:max-h-[385px]">
          <div className="flex flex-col gap-4 px-5 py-4 pb-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex max-w-[85%] flex-col gap-1 ${
                  msg.role === "user" ? "items-end self-end" : "items-start self-start"
                }`}
              >
                <span className="text-muted-foreground px-1 text-[10px] font-medium tracking-wider uppercase">
                  {msg.role === "user" ? "You" : "Gem"}
                </span>

                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words ${
                    msg.role === "user"
                      ? "bg-feature rounded-br-sm text-white"
                      : "bg-background/40 border-border/50 text-foreground/90 rounded-bl-sm border"
                  }`}
                >
                  {msg.summary}
                </div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="bg-background/40 border-border/50 mt-1 w-full overflow-hidden rounded-xl border p-3 shadow-sm">
                    <h4 className="text-muted-foreground mb-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase">
                      <BookText size={12} /> Sources
                    </h4>
                    <div className="flex flex-col gap-1">
                      {msg.sources.flatMap((s) => s.summeryS || []).filter(Boolean).length > 0 && (
                        <p className="text-foreground text-[11px] leading-relaxed break-words">
                          <span className="text-muted-foreground mr-1 font-semibold">Links:</span>
                          {msg.sources
                            .flatMap((s) => s.summeryS || [])
                            .filter(Boolean)
                            .map((link, i, arr) => (
                              <span key={`sum-${i}`}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-feature/94 decoration-feature/50 hover:text-feature hover:decoration-feature cursor-pointer underline underline-offset-2 transition-colors"
                                >
                                  {link}
                                </a>
                                {i < arr.length - 1 && ", "}
                              </span>
                            ))}
                        </p>
                      )}
                      {msg.sources.flatMap((s) => s.trendS || []).filter(Boolean).length > 0 && (
                        <p className="text-foreground text-[11px] leading-relaxed break-words">
                          <span className="text-muted-foreground mr-1 font-semibold">Trends:</span>
                          {msg.sources
                            .flatMap((s) => s.trendS || [])
                            .filter(Boolean)
                            .map((link, i, arr) => (
                              <span key={`trend-${i}`}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-feature/94 decoration-feature/50 hover:text-feature hover:decoration-feature cursor-pointer underline underline-offset-2 transition-colors"
                                >
                                  {link}
                                </a>
                                {i < arr.length - 1 && ", "}
                              </span>
                            ))}
                        </p>
                      )}
                      {msg.sources.flatMap((s) => s.tendenciesS || []).filter(Boolean).length >
                        0 && (
                        <p className="text-foreground text-[11px] leading-relaxed break-words">
                          <span className="text-muted-foreground mr-1 font-semibold">
                            Tendencies:
                          </span>
                          {msg.sources
                            .flatMap((s) => s.tendenciesS || [])
                            .filter(Boolean)
                            .map((link, i, arr) => (
                              <span key={`tend-${i}`}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-feature/94 decoration-feature/50 hover:text-feature hover:decoration-feature cursor-pointer underline underline-offset-2 transition-colors"
                                >
                                  {link}
                                </a>
                                {i < arr.length - 1 && ", "}
                              </span>
                            ))}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {msg.topPicks && msg.topPicks.length > 0 && (
                  <div className="mt-1 flex w-full flex-col gap-1.5">
                    <h4 className="text-muted-foreground ml-1 text-[10px] font-semibold tracking-wider uppercase">
                      Recommended Picks
                    </h4>
                    {msg.topPicks.map((pick, i) => (
                      <div
                        key={i}
                        onClick={() => openModal(pick.id)}
                        className="bg-background/60 border-border/80 hover:bg-background/80 flex cursor-pointer flex-col gap-1 rounded-xl border p-3 shadow-sm transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-foreground text-xs font-semibold">{pick.city}</span>
                          <span className="text-feature text-xs font-bold">{pick.price}</span>
                        </div>
                        <p className="text-muted-foreground mt-0.5 flex items-start gap-1 text-[11px] leading-snug">
                          <CheckCircle2 size={12} className="text-success mt-[2px] shrink-0" />
                          {pick.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex max-w-[85%] flex-col items-start gap-1 self-start">
                <span className="text-muted-foreground px-1 text-[10px] font-medium tracking-wider uppercase">
                  Gem
                </span>
                <div className="bg-background/40 border-border/50 flex items-center gap-1.5 rounded-2xl rounded-bl-sm border px-4 py-3.5">
                  <span
                    className="bg-foreground/40 h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="bg-foreground/40 h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="bg-foreground/40 h-1.5 w-1.5 animate-bounce rounded-full"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-border/50 bg-background/50 shrink-0 border-t p-4 backdrop-blur-md">
          <form
            onSubmit={handleSendMessage}
            className="border-border/50 bg-background/60 focus-within:border-feature/50 focus-within:bg-background focus-within:ring-feature/20 flex items-center gap-2 rounded-full border py-1.5 pr-1.5 pl-4 shadow-sm ring-1 ring-transparent transition-all"
          >
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Gem something..."
              disabled={isTyping}
              className="text-foreground placeholder:text-muted-foreground h-8 w-full border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-feature hover:bg-feature/90 flex h-8 w-8 shrink-0 items-center justify-center rounded-full p-0 text-white shadow-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={14} />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
