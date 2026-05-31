"use client";
import { useState, useEffect } from "react";

import { Sparkles, Info, ChartSpline, ArrowUpRight, Loader2, BookText } from "lucide-react";

import { analyzeNY } from "@/app/api/analyzeNY";
import { useEstateStore } from "@/shared/store/EstateStore";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const NYInfo = () => {
  const { estates, nyAnalysis, setNyAnalysis, fetchEstatesAction } = useEstateStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchEstatesAction();
  }, []);

  const handleAnalyze = async () => {
    if (estates.length === 0) return;
    setIsAnalyzing(true);
    try {
      const data = await analyzeNY(estates);
      setNyAnalysis(data);
    } catch (error) {
      console.error("NY Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="font-inter border-border/60 bg-background/60 mx-auto flex h-[calc(100dvh-150px)] w-full flex-col gap-4 overflow-hidden rounded-[24px] border p-3 shadow-sm backdrop-blur-xl sm:h-[calc(100dvh-120px)] sm:p-5">
      <div className="border-border/50 flex shrink-0 items-center gap-3 border-b pb-3">
        <div className="bg-feature flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
          <Sparkles size={16} />
        </div>
        <div>
          <h3 className="text-foreground text-sm font-semibold">Gemini Review</h3>
          <p className="text-muted-foreground text-[11px]">Powered by Gemini</p>
        </div>
      </div>

      <ScrollArea className="h-full max-h-[calc(100dvh-230px)] w-full flex-1 sm:max-h-[calc(100dvh-200px)]">
        {!nyAnalysis && !isAnalyzing && (
          <div className="flex h-full flex-col items-center justify-center gap-3 pt-20 text-center">
            <div className="bg-background/40 text-feature rounded-full">
              <Sparkles size={32} />
            </div>
            <h4 className="text-sm font-medium">Analyze New York!</h4>
            <Button
              onClick={handleAnalyze}
              className="bg-feature hover:bg-feature-foreground mt-2 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all disabled:opacity-50"
            >
              Analyze NY Market
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex h-full flex-col items-center justify-center gap-3 pt-32 text-center">
            <div className="relative">
              <div className="bg-feature/30 absolute inset-0 animate-pulse rounded-full blur-xl" />
              <Loader2 className="text-feature relative z-10 animate-spin" size={40} />
            </div>
            <p className="text-muted-foreground mt-2 animate-pulse text-xs">
              Analyzing New York real estate data...
            </p>
          </div>
        )}

        {nyAnalysis && !isAnalyzing && (
          <div className="flex flex-col gap-4 pr-3 pb-4 sm:pr-4">
            <div className="bg-muted/40 border-border/50 w-full overflow-hidden rounded-2xl border p-3 sm:p-4">
              <h4 className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                <Info size={14} className="text-blue-500" /> Summary
              </h4>
              <p className="text-foreground/90 text-justify text-sm leading-relaxed break-words">
                {nyAnalysis.summary}
              </p>
            </div>

            <div className="bg-muted/45 border-border/50 grid w-full grid-cols-1 gap-4 overflow-hidden rounded-2xl border p-3 sm:p-4 md:grid-cols-2">
              <div className="w-full overflow-hidden">
                <h4 className="text-success mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <ArrowUpRight size={14} /> Trends
                </h4>
                <p className="text-foreground/90 border-success/30 border-l-2 pl-3 text-justify text-sm leading-relaxed break-words">
                  {nyAnalysis.trend}
                </p>
              </div>

              <div className="w-full overflow-hidden">
                <h4 className="text-feature mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <ChartSpline size={14} /> Tendencies
                </h4>
                <p className="text-foreground/90 border-feature border-l-2 pl-3 text-justify text-sm leading-relaxed break-words">
                  {nyAnalysis.tendencies}
                </p>
              </div>
            </div>

            <div className="bg-feature/5 border-feature/20 mt-1 w-full overflow-hidden rounded-2xl border p-3 sm:p-4">
              <h4 className="text-feature mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                <Sparkles size={14} /> In Conclusion
              </h4>
              <p className="text-foreground text-justify text-sm leading-relaxed font-medium break-words">
                {nyAnalysis.conclusion}
              </p>
            </div>

            {nyAnalysis.sources && nyAnalysis.sources.length > 0 && (
              <div className="bg-feature/3 border-feature/20 mt-1 w-full overflow-hidden rounded-2xl border p-3 sm:p-4">
                <h4 className="text-feature mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <BookText size={14} /> Sources:
                </h4>
                <div className="flex flex-col gap-2">
                  <p className="text-foreground text-sm leading-relaxed font-medium break-words">
                    <span className="text-muted-foreground mr-1 font-semibold">Summary:</span>
                    {nyAnalysis.sources
                      .flatMap((s) => s.summeryS)
                      .map((link, idx, arr) => (
                        <span key={`sum-${idx}`}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-feature/94 decoration-feature/50 hover:text-feature hover:decoration-feature cursor-pointer underline underline-offset-2 transition-colors"
                          >
                            {link}
                          </a>
                          {idx < arr.length - 1 && ", "}
                        </span>
                      ))}
                  </p>
                  <p className="text-foreground text-sm leading-relaxed font-medium break-words">
                    <span className="text-muted-foreground mr-1 font-semibold">Trends:</span>
                    {nyAnalysis.sources
                      .flatMap((s) => s.trendS)
                      .map((link, idx, arr) => (
                        <span key={`trend-${idx}`}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-feature/94 decoration-feature/50 hover:text-feature hover:decoration-feature cursor-pointer underline underline-offset-2 transition-colors"
                          >
                            {link}
                          </a>
                          {idx < arr.length - 1 && ", "}
                        </span>
                      ))}
                  </p>
                  <p className="text-foreground text-sm leading-relaxed font-medium break-words">
                    <span className="text-muted-foreground mr-1 font-semibold">Tendencies:</span>
                    {nyAnalysis.sources
                      .flatMap((s) => s.tendenciesS)
                      .map((link, idx, arr) => (
                        <span key={`tend-${idx}`}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-feature/94 decoration-feature/50 hover:text-feature hover:decoration-feature cursor-pointer underline underline-offset-2 transition-colors"
                          >
                            {link}
                          </a>
                          {idx < arr.length - 1 && ", "}
                        </span>
                      ))}
                  </p>
                </div>
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              className="text-feature/94 hover:text-feature my-2 self-center bg-transparent text-xs underline transition-colors hover:bg-transparent"
            >
              Regenerate Analysis
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
