"use client";

import { useState } from "react";

import { Bot, X, Sparkles, Loader2, TrendingUp, CheckCircle2 } from "lucide-react";

import { analyzeMarket } from "@/app/api/analyzeMarket";
import { useFilteredEstates } from "@/shared/hooks/hooks";
import { useEstateStore } from "@/shared/store/EstateStore";
import { TopAnswer } from "@/shared/types/types";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { estates, isAnalyzing, marketAnalysis, setIsAnalyzing, setMarketAnalysis } =
    useEstateStore();

  const filteredEstates = useFilteredEstates();

  const handleAnalyze = async () => {
    if (filteredEstates.length === 0) return;
    setIsAnalyzing(true);
    try {
      const data = await analyzeMarket(filteredEstates);
      setMarketAnalysis(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="font-inter fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="border-border/60 bg-background/20 animate-in slide-in-from-bottom-5 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl backdrop-saturate-150 sm:w-[400px]">
          <div className="border-border/50 bg-muted/30 flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="bg-feature text-background flex h-8 w-8 items-center justify-center rounded-full">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">AI Analysis</h3>
                <p className="text-muted-foreground text-xs">Powered by Gemini</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:bg-muted rounded-full bg-transparent p-1 transition-colors"
            >
              <X size={18} />
            </Button>
          </div>

          <ScrollArea className="h-[440px] w-full">
            <div className="p-4">
              {!marketAnalysis && !isAnalyzing && (
                <div className="flex flex-col items-center justify-center gap-3 pt-12 text-center">
                  <div className="bg-background/40 text-feature rounded-full p-4">
                    <Sparkles size={32} />
                  </div>
                  <h4 className="text-sm font-medium">Ready to analyze!</h4>
                  <p className="text-muted-foreground px-4 text-xs">
                    I will analyze {estates.length} properties currently loaded on your map to find
                    the best market opportunities.
                  </p>
                  <Button
                    onClick={handleAnalyze}
                    disabled={estates.length === 0}
                    className="bg-feature mt-4 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 disabled:opacity-50"
                  >
                    Analyze Market
                  </Button>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center gap-3 pt-20 text-center">
                  <Loader2 className="text-feature animate-spin" size={32} />
                  <p className="text-muted-foreground animate-pulse text-xs">
                    Analyzing market data and trends...
                  </p>
                </div>
              )}

              {marketAnalysis && !isAnalyzing && (
                <div className="flex flex-col gap-4 pb-4 text-sm">
                  <div className="bg-muted/40 border-border/50 rounded-xl rounded-tl-none border p-4 shadow-sm">
                    <h4 className="text-foreground mb-1 flex items-center gap-2 font-semibold">
                      <Sparkles size={16} className="text-feature" /> Market Summary
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {marketAnalysis.summary}
                    </p>
                  </div>

                  <div className="bg-muted/40 border-border/50 rounded-xl border p-4 shadow-sm">
                    <h4 className="text-foreground mb-1 flex items-center gap-2 font-semibold">
                      <TrendingUp size={16} className="text-success" /> Current Trend
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {marketAnalysis.trend}
                    </p>
                  </div>

                  {marketAnalysis.topPicks && marketAnalysis.topPicks.length > 0 && (
                    <div>
                      <h4 className="text-foreground text-muted-foreground mb-2 ml-1 text-xs font-semibold tracking-wider uppercase">
                        Recommended by Gemini
                      </h4>
                      <div className="flex flex-col gap-2">
                        {marketAnalysis.topPicks.map((pick: TopAnswer, index: number) => (
                          <div
                            key={index}
                            className="bg-background border-border/80 flex flex-col gap-1 rounded-xl border p-3 shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">ID: {pick.id}</span>
                              <span className="text-feature font-bold">{pick.price}</span>
                            </div>
                            <p className="text-muted-foreground flex items-start gap-1 text-[11px]">
                              <CheckCircle2 size={12} className="text-success mt-[2px] shrink-0" />
                              {pick.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleAnalyze}
                    className="text-muted-foreground text-feature/90 mt-2 self-center bg-transparent text-xs underline transition-colors"
                  >
                    Regenerate based on current filters
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-background flex h-12 w-12 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-foreground/90 hover:bg-foreground"
            : "bg-feature/90 hover:bg-feature-foreground"
        }`}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </Button>
    </div>
  );
};
