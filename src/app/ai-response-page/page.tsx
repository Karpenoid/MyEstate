import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Response Page",
  description: "AI Response Page",
};

export default function AIresponsePage() {
  return (
    <div className="w-full">
      <p>Your AI reponses history</p>
    </div>
  );
}
