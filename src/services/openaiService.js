const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeWithOpenAI = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    return response;
  } catch (error) {
    console.error("Error al interactuar con la API de OpenAI", error);
    throw error;
  }
};

module.exports = { analyzeWithOpenAI };
