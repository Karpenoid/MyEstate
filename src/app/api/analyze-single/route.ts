import { NextResponse } from "next/server";

import { GoogleGenAI } from "@google/genai";

import { PERSONA } from "@/shared/entities/persona";
import { ApiEstate } from "@/shared/types/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type GeminiPart = { text: string } | { inlineData: { data: string; mimeType: string } };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { estate: ApiEstate };
    const { estate } = body;

    if (!estate) {
      return NextResponse.json(
        { success: false, error: "No estate data provided" },
        { status: 400 },
      );
    }

    const { imgSrc, detailUrl, latLong, ...estateData } = estate;

    const promptText = `
      Analyze in details this specific property in detail.
      Here is the data: ${JSON.stringify(estateData)}
      
      Look at the provided image to describe the exterior condition.
      
      You must respond ONLY with a JSON object exactly matching this structure:
      {
        "summary": "General 3-4-sentences overview of the property and its value proposition",
        "exterior": "Visual analysis of the exterior based on the provided image",
        "advantages": "The key advantages of estate & its properties",
        "disadvantages": "The main disadvantages of estate & its properties",
        "conclusion": "Final verdict on whether it's a good purchase or not"
      }
    `;

    const contents: GeminiPart[] = [{ text: promptText }];

    if (imgSrc) {
      try {
        const imageResponse = await fetch(imgSrc);
        if (imageResponse.ok) {
          const arrayBuffer = await imageResponse.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          contents.push({
            inlineData: {
              data: buffer.toString("base64"),
              mimeType: imageResponse.headers.get("content-type") || "image/jpeg",
            },
          });
        } else {
          console.warn("Failed to fetch image from Zillow, proceeding with text only.");
        }
      } catch (imgError) {
        console.error("Error processing image:", imgError);
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        systemInstruction: PERSONA,
      },
    });

    if (!response.text) {
      throw new Error("Received empty response from Gemini");
    }

    const analysisResult = JSON.parse(response.text);
    return NextResponse.json({ success: true, analysis: analysisResult });
  } catch (error) {
    console.error("Single Estate Analysis Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to analyze single estate" },
      { status: 500 },
    );
  }
}
