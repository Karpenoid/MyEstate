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
      Analyse the reliable information on the New York property market in detail and provide a comprehensive, detailed response.
      Outline which properties are currently in highest demand and which are least sought-after. You can also compare information from the other sources to this unofficial data: ${JSON.stringify(mappedData)}
      
      You must respond ONLY with a JSON object exactly matching this structure:
      {
        "summary": "Provide a detailed analysis (10-12 sentences) of the property market and its current state, taking into account different types of property (flats, houses, etc.) as well as locations (districts, etc.).
        Outline which properties are currently in highest demand and which are least sought-after.",
        
        "trend": "Based on reliable information, outline the current trends. 
        Provide a well-founded analysis (4-5 sentences) of what is in highest demand, taking into account the type of property in vogue, as well as which areas are currently seeing the greatest demand for property.",
        
        "tendencies": "Based on reliable information, its analysis, and an analysis of trends, please provide a detailed and comprehensive description of market trends (both short-term and long-term). 
        Please also offer advice (4-5 sentences) on which type of property would be a sound investment, as well as which areas of the city.",
        
        "conclusion": "Please provide a detailed analysis (8-10 sentences) of the current state of the property market, its short-term and long-term trends, and what to expect in the future.",
      }
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
