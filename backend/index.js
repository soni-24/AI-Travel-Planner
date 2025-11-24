
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// Enable CORS for frontend
app.use(cors());
app.use(express.json());
const PORT = 4000;

// Gemini Setup
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Travel Planning API Route
app.post("/travel-plan", async (req, res) => {
  try {
    const { destination, days, budget, type, start } = req.body;

    if (!destination || !days || !budget || !type || !start) {
      return res.status(400).json({ 
        error: "All fields required: destination, days, budget, type, start" 
      });
    }

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Create a detailed ${days}-day travel plan from ${start} to ${destination} for ${type.toLowerCase()} travel with a budget of $${budget}.

    Please provide the response in the following JSON format:
    {
      "start": "${start}",
      "destination": "${destination}",
      "days": ${days},
      "type": "${type}",
      "budget": ${budget},
      "breakdown": {
        "accommodation": number,
        "food": number,
        "transport": number,
        "activities": number,
        "misc": number
      },
      "itinerary": [
        {
          "day": 1,
          "activities": ["activity1", "activity2", "activity3"]
        }
      ],
      "attractions": ["attraction1", "attraction2", "attraction3", "attraction4"],
      "food": ["food1", "food2", "food3"],
      "tips": ["tip1", "tip2", "tip3"]
    }

    Make sure the breakdown adds up to the total budget. Include specific activities for each day, real attractions in ${destination}, local food recommendations, and practical travel tips for ${type.toLowerCase()} travelers.`;

    const response = await model.generateContent(prompt);
    let text = response.response.text().trim();

    // Clean the response
    text = text.replace(/```json/g, "").replace(/```/g, "");

    let plan;
    try {
      plan = JSON.parse(text);
    } catch (err) {
      // If JSON parsing fails, return a basic structure
      plan = {
        error: "Failed to generate proper plan",
        raw: text
      };
    }

    res.json(plan);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});