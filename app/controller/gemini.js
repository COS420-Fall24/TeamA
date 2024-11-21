require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function processPrompt() {
    try {
        const prompt = "Hello World!";
        const result = await model.generateContent([prompt]);

        console.log(result.response.text());
        return { message: result.response.text() };
    } catch (error) {
        console.error("Error with the API call:", error.message);
        throw error;
    }
}

module.exports = {
    processPrompt
};
