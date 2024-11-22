const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function processPrompt(req, res) {
    try {
        const prompt = req.body.prompt;
        const result = await model.generateContent([prompt]);
        return res.json({ message: result.response.text() });
    } catch (error) {
        console.error("Error with the API call:", error.message);
        throw error;
    }
}

module.exports = {
    processPrompt
};
