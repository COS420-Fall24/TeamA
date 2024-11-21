import { ChatGPTAPI } from 'chatgpt'


async function example() {
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY
    })
  
    const res = await api.sendMessage('Hello World!')
    console.log(res.text)
  }

function getSampleText(req, res) {
    console.log(req.user);
    res.json({ message: "This is a sample text from the OpenAI controller." });
}

module.exports = {
    getSampleText
};