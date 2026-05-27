import { Sparkles, Info, CheckCircle2, XCircle, Bot } from "lucide-react";

export const ResponseBox = () => {
  return (
    <div className="font-inter border-border/60 bg-background/60 flex flex-col gap-4 rounded-[24px] border p-5 shadow-sm backdrop-blur-xl">
      <div className="border-border/50 flex items-center gap-3 border-b pb-3">
        <div className="bg-feature flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
          <Sparkles size={16} />
        </div>
        <div>
          <h3 className="text-foreground text-sm font-semibold">Gemini Review</h3>
          <p className="text-muted-foreground text-[11px]">Powered by Gemini Vision</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-muted/40 border-border/50 rounded-2xl border p-4">
          <h4 className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
            <Info size={14} className="text-blue-500" /> Summary
          </h4>
          <p className="text-foreground/90 text-sm leading-relaxed">Text</p>
        </div>
        <div className="bg-muted/45 border-border/50 grid grid-cols-1 gap-4 rounded-2xl border p-4">
          <div>
            <h4 className="text-success mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
              <CheckCircle2 size={14} /> Advantages
            </h4>
            <p className="text-foreground/90 border-success/30 space-y-1 border-l-2 pl-3 text-sm leading-relaxed">
              Text
            </p>
          </div>

          <div>
            <h4 className="text-destructive mb-2 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
              <XCircle size={14} /> Disadvantages
            </h4>
            <ul className="text-foreground/90 border-destructive/30 space-y-1 border-l-2 pl-3 text-sm leading-relaxed">
              Text
            </ul>
          </div>
        </div>
        <div className="bg-feature/5 border-feature/20 mt-1 rounded-2xl border p-4">
          <h4 className="text-feature mb-1 flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
            <Bot size={14} /> In Conclusion
          </h4>
          <p className="text-foreground text-sm leading-relaxed font-medium">Text</p>
        </div>
      </div>
    </div>
  );
};
