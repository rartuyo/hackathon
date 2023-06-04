import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from "react";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const preText = (activity) =>
  `Give me a list of suggested activities that achieves the same purpose of the given activity but without using as much energy. For example, if I say “Do Laundry”, please return “wash clothes by hand, run into detergent with clothes on, buy new clothes”. For example, do “${activity}”. No prose, maximum 3 activities.`;
export default function useSuggestedActivity() {
  const [suggestedActivity, setSuggestedActivity] = useState<
    string | undefined
  >("");

  const getSuggestedActivity = async (content: string) => {
    if (!content) {
      return;
    }

    try {
      const { data } = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: preText(content) }],
      });

      if (typeof data !== "undefined") {
        console.log(data?.choices[0]?.message.content);
        return data?.choices[0]?.message.content;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    suggestedActivity,
    getSuggestedActivity,
  };
}
