import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export function useActivityRate() {
  const [activityType, setActivityRate] = useState("");
  const getConsumptionRate = async (content: string) => {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content }],
      });

      setActivityRate(completion.data.choices[0].message);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    activityType,
    getConsumptionRate,
  };
}
