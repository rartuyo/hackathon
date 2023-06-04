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

function calculateTotalAmount(startTime, endTime) {
  const totalAmount = data.reduce((sum, entry) => {
    const entryStartTime = new Date(entry.valid_from);
    const entryEndTime = new Date(entry.valid_to);

    if (entryStartTime >= startTime && entryEndTime <= endTime) {
      return sum + entry.value;
    }

    return sum;
  }, 0);

  return totalAmount;
}
