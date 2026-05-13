import { EstateMap } from "@/widgets/EstateMap";
import { FloatingHeader } from "@/widgets/FloatingHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 px-2 py-3 transition-colors duration-500 md:px-2 md:py-3 dark:bg-slate-950">
      <FloatingHeader />
      <main className="mx-auto max-w-4xl space-y-8">
        <EstateMap />
      </main>
    </div>
  );
}
