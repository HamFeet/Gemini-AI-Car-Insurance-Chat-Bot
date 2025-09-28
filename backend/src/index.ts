import "dotenv/config"
import express, { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.GEMINI_API_KEY

//Sanity check when the env file was not working
if (process.env.GEMINI_API_KEY){
  console.log("✅ API Key successfully loaded!")
}else {
  console.log("❌ API key not found!")
}

const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.get("/api/generate", async (req: Request, res: Response) => {
    try {
        const result = await model.generateContent("Write me a fun fact about golf.");
        res.json({ message: result.response.text() });
    } catch (err) {
        console.error("Gemini API error:", err);
        res.status(500).json({ error: "Failed to generate content" });
    }
});

app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "Hello from the API!" });
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
