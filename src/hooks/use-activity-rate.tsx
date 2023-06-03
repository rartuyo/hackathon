import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export function useActivityRate() {
  const [activityType, setActivityRate] = useState("");
  const getConsumptionRate = async (content) => {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content }],
      });

      // @ts-ignore
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
