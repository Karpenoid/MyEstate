import { HeaderPart } from "@/widgets/HeaderPart";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 transition-colors duration-500 md:p-8 dark:bg-slate-950">
      <main className="mx-auto max-w-4xl space-y-8">
        <HeaderPart />
      </main>
    </div>
  );
}
