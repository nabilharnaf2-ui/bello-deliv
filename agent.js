import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function runAgent() {
  try {
    console.log("Agent is working...");

    const prompt = `
      Act as an expert SEO copywriter and affiliate marketer. 
      Write a detailed, high-quality, and human-sounding review article about: "Best AI tools for digital marketing in 2026".
      
      Rules:
      - Use an engaging, professional tone.
      - Solve real user problems.
      - Include Introduction, Features, Pros & Cons, and CTA for affiliate link.
      - Format in clean Markdown or HTML.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const article = response.text;
    fs.writeFileSync('output-article.md', article);
    console.log("Article generated successfully!");

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

runAgent();
