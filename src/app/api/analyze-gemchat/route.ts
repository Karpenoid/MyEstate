import { NextResponse } from "next/server";

import { GoogleGenAI } from "@google/genai";

import { PERSONA } from "@/shared/entities/persona";
import { ApiEstate } from "@/shared/types/types";

export const maxDuration = 120;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type GeminiMessage = {
  role: "model" | "user";
  parts: { text: string }[];
};

export async function POST(request: Request) {
  try {
    const { estates, messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: "Messages are required" }, { status: 400 });
    }

    const mappedData = (estates || []).map((e: ApiEstate) => ({
      id: e.id,
      price: e.price,
      city: e.address?.city,
      address: e.address,
      beds: e.beds,
      baths: e.baths,
      area: e.area,
      status: e.homeStatus,
      homeType: e.homeType,
    }));

    const rawHistory: GeminiMessage[] = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "ai" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const geminiHistory: GeminiMessage[] = [];
    for (const msg of rawHistory) {
      if (geminiHistory.length === 0) {
        if (msg.role === "user") geminiHistory.push(msg);
      } else {
        if (msg.role !== geminiHistory[geminiHistory.length - 1].role) {
          geminiHistory.push(msg);
        }
      }
    }

    if (geminiHistory.length === 0) {
      throw new Error("Invalid conversation history: No valid user messages found.");
    }

    const customSystemInstruction = `
      ${PERSONA}
      
      You are an expert real estate AI assistant. 
      You have access to this current, live database of properties:
      ${JSON.stringify(mappedData)}

      Instructions for your response:
      1. Answer the user's latest question directly and thoroughly in the "summary" field.
      2. Provide a short conclusion or tip in the "conclusion" field.
      3. If the user asks for specific properties, search the provided database and fill the "topPicks" array with best matching properties to the context. 
      4. If the user's question is general, leave "topPicks" empty.
      5. Always provide sources of information that you used.

      You MUST respond ONLY with a JSON object exactly matching this structure:
      {
        "summary": "Provide a detailed (but no too long. 3-8 sentences, it depends on user's message) response to the user's message.",
        "conclusion": "Please provide a short conclusion (2-4 sentences) of your response to the user's message.",
        "sources": [
          {
            "summeryS": ["Array of URL strings for the sources used for the summary. Example: 'https://link1.com', 'https://link2.com'"],
          }
        ],
        "topPicks": [
          {
            "id": "Property ID here",
            "city": "Property city here",
            "price": "Price here",
            "reason": "Advantages of this variant and why is this a good choice"
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: geminiHistory,
      config: {
        responseMimeType: "application/json",
        systemInstruction: customSystemInstruction,
      },
    });

    if (!response.text) {
      throw new Error("Received empty response from Gemini");
    }

    let rawText = response.text;
    rawText = rawText
      .replace(/```json/gi, "")
      .replace(/```/gi, "")
      .trim();

    const analysisResult = JSON.parse(rawText);

    return NextResponse.json({ success: true, analysis: analysisResult });
  } catch (error: unknown) {
    const apiError = error as { response?: { data?: unknown } };
    console.error("Gemini Error Details:", apiError?.response?.data || error);

    return NextResponse.json({ success: false, error: "Analysis failed" }, { status: 500 });
  }
}
