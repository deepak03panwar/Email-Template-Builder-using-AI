import { GenerateEmailTemplateAIModel } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        let body;
        try {
            body = await req.json();  // ✅ Safe parsing of JSON
        } catch (error) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { prompt } = body;
        console.log("📥 Received Prompt:", prompt);

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json({ error: "Missing or invalid prompt" }, { status: 400 });
        }

        const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);
        
        if (!result || !result.response || typeof result.response.text !== "function") {
            throw new Error("AI API returned an invalid response format");
        }

        // Correctly extract response text
        const aiResp = await result.response.text();
        console.log("✅ AI Response:", aiResp);

        return NextResponse.json({ design: aiResp }, { status: 200 });

    } catch (e) {
        console.error("❌ AI API Error:", e);
        return NextResponse.json({ error: e.message || "AI API request failed" }, { status: 500 });
    }
}
