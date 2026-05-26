import { useEffect, useState } from "react";

import { CheckCircle2, ImageIcon, Info, Loader2, Sparkles, XCircle } from "lucide-react";

import { analyzeSingle } from "@/app/api/analyzeSingle";
import { useEstateStore } from "@/shared/store/EstateStore";
import { SoloEstateAnalysis } from "@/shared/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { ScrollArea } from "@/shared/ui/scroll-area";

export const DetailedInfo = () => {
  const { isAiModalOpen, closeAIWindow, selectedEstateId, estates } = useEstateStore();
  const estate = estates.find((e) => e.id === selectedEstateId);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SoloEstateAnalysis | null>(null);

  useEffect(() => {
    if (isAiModalOpen && estate && !analysis) {
      const fetchAnalysis = async () => {
        setIsAnalyzing(true);
        try {
          const data = await analyzeSingle(estate);
          setAnalysis(data);
        } catch (error) {
          console.error("Analysis failed:", error);
        } finally {
          setIsAnalyzing(false);
        }
      };
      fetchAnalysis();
    }

    if (!isAiModalOpen) {
      setIsAnalyzing(false);
    }
  }, [isAiModalOpen, estate, analysis]);

  const onOpenChange = (open: boolean) => {
    if (!open) closeAIWindow();
  };

  if (!estate) return null;

  return (
    <Dialog open={isAiModalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="font-inter border-border/60 bg-background/50 flex h-[550px] w-[380px] flex-col overflow-hidden rounded-[32px] border p-0 shadow-2xl backdrop-blur-xl backdrop-saturate-150 sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Property Analysis</DialogTitle>
          <DialogDescription>Gemini analysis for the selected property.</DialogDescription>
        </DialogHeader>

        <div className="border-border/50 bg-feature/5 flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-feature flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-foreground text-sm font-semibold">Gemini Review</h3>
              <p className="text-muted-foreground text-[11px]">Powered by Gemini</p>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[475px] w-full">
          <div className="p-5">
            {isAnalyzing ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 pt-20 text-center">
                <div className="relative">
                  <div className="bg-feature/30 absolute inset-0 animate-pulse rounded-full blur-xl" />
                  <Loader2 className="text-feature relative z-10 animate-spin" size={40} />
                </div>
                <p className="text-muted-foreground mt-2 animate-pulse text-xs">
                  Analyzing photos and data...
                </p>
              </div>
            ) : analysis ? (
              <div className="font-inter flex flex-col gap-5 pb-4">
                <div className="bg-muted/45 border-border/50 rounded-2xl border p-4">
                  <h4 className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                    <Info size={14} className="text-blue-500" /> Summary
                  </h4>
                  <p className="text-sm leading-relaxed">{analysis.summary}</p>
                </div>

                <div className="bg-muted/45 border-border/50 rounded-2xl border p-4">
                  <h4 className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                    <ImageIcon size={14} className="text-purple-500" /> Exterior description
                  </h4>
                  <p className="text-foreground/90 text-sm leading-relaxed">{analysis.exterior}</p>
                </div>

                <div className="bg-muted/45 border-border/50 grid grid-cols-1 gap-4 rounded-2xl border p-4">
                  <div>
                    <h4 className="text-success mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                      <CheckCircle2 size={14} /> Advantages
                    </h4>
                    <p className="text-foreground/90 border-success/30 border-l-2 pl-2 text-sm leading-relaxed whitespace-pre-wrap">
                      {analysis.advantages}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-destructive mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                      <XCircle size={14} /> Disadvantages
                    </h4>
                    <p className="text-foreground/90 border-destructive/30 border-l-2 pl-2 text-sm leading-relaxed whitespace-pre-wrap">
                      {analysis.disadvantages}
                    </p>
                  </div>
                </div>

                <div className="bg-feature/5 border-feature/20 mt-2 rounded-2xl border p-4">
                  <h4 className="text-feature mb-1 text-xs font-bold tracking-wider uppercase">
                    In Conclusion
                  </h4>
                  <p className="text-sm leading-relaxed font-medium">{analysis.conclusion}</p>
                </div>
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
