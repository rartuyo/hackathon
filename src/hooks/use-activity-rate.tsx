import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from "react";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const preText = (activity) =>
  `Rate this event name by category. There are only 2 categories. 1 is High Energy Usage that can be rescheduled, 2 is low energy usage that are done outside of a persons home or office. High energy usage activities use electronics or energy from a person’s home or office. Examples include meetings, laundry, watching tv: these are all examples of category 1. Do not include prose. Only response with “Category 1” or “Category 2”. What is ${activity}?`;
export function useActivityRate() {
  const [activityType, setActivityRate] = useState<string | undefined>("");

  const getConsumptionRate = async (content: string) => {
    if (!content) {
      return;
    }

    try {
      const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: preText(content) }],
      });

      if (typeof data !== "undefined") {
        setActivityRate(data?.choices[0]?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    activityType,
    getConsumptionRate,
  };
}
