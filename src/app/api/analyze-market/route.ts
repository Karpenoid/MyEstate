import { NextResponse } from "next/server";

import { GoogleGenAI } from "@google/genai";

import { PERSONA } from "@/shared/entities/persona";
import { ApiEstate } from "@/shared/types/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { estates } = await request.json();

    if (!estates || estates.length === 0) {
      return NextResponse.json({ success: false, error: "No data" }, { status: 400 });
    }

    const mappedData = estates.map((e: ApiEstate) => ({
      id: e.id,
      price: e.price,
      city: e.address.city,
      address: e.address,
      beds: e.beds,
      baths: e.baths,
      area: e.area,
      status: e.homeStatus,
      homeType: e.homeType,
      taxAssessedValue: e.taxAssessedValue,
      daysOnZillow: e.daysOnZillow,
      zestimate: e.zestimate,
    }));

    const prompt = `
      Analyze in details this real estate data: ${JSON.stringify(mappedData)}
      
      You must respond ONLY with a JSON object exactly matching this structure:
      {
        "summary": "A short 4-sentence overview of the provided properties",
        "trend": "General market trend observed in this data",
        "topPicks": [
          {
            "id": "Property ID here",
            "city": "Property city here",
            "price": "Price here",
            "reason": "Advantages of this variant and why is this a good choice"
          }
        ]
      }
      Return maximum 2 top picks.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
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
    console.error("Gemini Error:", error);
    return NextResponse.json({ success: false, error: "Analysis failed" }, { status: 500 });
  }
}
