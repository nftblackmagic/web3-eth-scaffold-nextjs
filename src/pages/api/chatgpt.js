import { PromptableApi } from "promptable";
import { Configuration, OpenAIApi } from "openai";
import GPT3Tokenizer from "gpt3-tokenizer";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

const chatgpt = async (req, res) => {
  const { message, promptId, chatHistory } = req.body;
  console.log("api call entry", message, promptId);
  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }
  if (!promptId) {
    res.status(400).json({ error: "Prompt ID is required" });
    return;
  }
  // call prompt ai api and openai api
  const reply = await getReply(message, promptId, chatHistory || "");
  res.status(200).json({ reply });
  return;
};

const getReply = async (message, promptId, chatHistory) => {
  // get prompt from prompt ai api based on promptId
  if (!promptId) {
    throw new Error("Prompt ID is required");
  }
  const promptDeployment = await PromptableApi.getActiveDeployment({
    promptId: promptId,
  });
  console.log("prompt deployment", promptDeployment);
  if (!promptDeployment) {
    throw new Error("Prompt deployment not found");
  }
  // replace prompt with message

  const beforeChatHistory = promptDeployment.text.replace("{{input}}", message);

  const numTokens = countBPETokens(beforeChatHistory);
  const afterChatHistory = beforeChatHistory.replace(
    "{{chat history}}",
    chatHistory
  );

  const finalPromptText = leftTruncateTranscript(
    afterChatHistory,
    4000 - numTokens
  );

  const revisedPrompt = {
    ...promptDeployment,
    text: finalPromptText,
  };

  console.log("revised prompt", revisedPrompt);
  // call openai api
  const response = await openai.createCompletion({
    model: revisedPrompt.config.model,
    prompt: revisedPrompt.text,
    temperature: revisedPrompt.config.temperature,
    max_tokens: revisedPrompt.config.max_tokens,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: revisedPrompt.config.stop,
  });
  console.log("openai response", response.data);
  if (response.data.choices && response.data.choices.length > 0) {
    return response.data.choices[0].text;
  } else {
    return "I'm sorry, I don't understand.";
  }
};

function countBPETokens(text) {
  const encoded = tokenizer.encode(text);
  return encoded.bpe.length;
}

function leftTruncateTranscript(text, maxTokens) {
  const encoded = tokenizer.encode(text);
  const numTokens = encoded.bpe.length;
  const truncated = encoded.bpe.slice(numTokens - maxTokens);
  const decoded = tokenizer.decode(truncated);
  return decoded;
}

export default chatgpt;
