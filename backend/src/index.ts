import "dotenv/config"
import express, { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json())
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

app.post("/api/generate/question", async (req: Request, res: Response) => {
    try {
        // Access the data sent from the frontend via req.body
        const { answers, questions } = req.body;
        
        console.log(`Received answer: "${answers}" (Questions: ${questions})`);

        // Use the received data to create the prompt for Gemini
        const prompt = 
        `You are a car insurance consultant, your job is to ask questions based on the users answers. 
        Please ask questions to determine which level of cover the user needs (Mechanical breakdown Insuranse, Comprehensive Car Insurance, Third Party Car Insurance).
        
        Here are some rules: 
            - Only ask questions if the user agrees to the first question. 
            - You can only ask one question at a time and you can't answer any questions.
            - Mechanical breakdown Insuranse is not available to trucks and racing cars. 
            - Comprehensive Car Insurance is only available to any motor vehicles less than 10 years old.
            - You can't directly ask what type of cover the user wants.
            - Ask direct questions ie 'Do you want to include x in your cover'.

        The current questions are ${questions} and the answeres were ${answers}.
            
        Once you have asked 5-7 questions or you believe you have enough information please reccomend one of the three types of cover.`;

        const result = await model.generateContent(prompt);
        console.log("Gemini raw response:", result.response);
        const text = result.response.text();
        console.log("Gemini extracted text:", result.response.text());
       

        // Defensive check
        if (!text || typeof text !== "string"){
            console.error("Gemini returned a empty or invalid response");
            return res.status(500).json({error: "Empty or invalid response from Gemini"});
        }
        // Respond with the new question from the AI
        res.json({ message: text });
    } catch (err) {
        console.error("Gemini API error:", err);
        // Make sure to log the request body if you want to debug data issues
        console.error("Request Body:", req.body); 
        res.status(500).json({ error: "Failed to generate content" });
    }
});
app.get("/api/generate", async (req: Request, res: Response) => {
    try {
        const result = await model.generateContent("Write me a fun fact about golf.");
        res.json({ message: result.response.text() });
        // console.log(req)
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
