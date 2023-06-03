import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello world" }],
});

console.log(completion.data.choices[0].message);
