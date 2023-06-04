import { useState } from "react";
import { useQuery } from "react-query";
import { differenceInMinutes, startOfHour, addMinutes } from "date-fns";
import { end } from "@popperjs/core";

const fetchSuggestions = async () => {
  const response = await fetch(
    "https://poor-turtles-marry.loca.lt/api/v1/suggest/day"
  );

  return response.json();
};

export default function useSuggestedTime() {
  const [suggestedBlocks, setSuggestedBlocks] = useState();

  useQuery(
    "suggestions",
    async function () {
      return fetchSuggestions();
    },
    {
      onSuccess(res) {
        setSuggestedBlocks(res.data);
      },
    }
  );

  const getNumberOfBlocks = (start: Date | string, end: Date | string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);

    const startHour = startOfHour(startTime);
    const totalMinutes = differenceInMinutes(endTime, startTime);
    return Math.floor(totalMinutes / 30);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getSuggestions = (start: Date | string, end: Date | string) => {
    const numberOfBlocks = getNumberOfBlocks(start, end);

    const sums = [];
    const blocks = [];

    for (let i = 0; i < suggestedBlocks.length - (numberOfBlocks - 1); i++) {
      let sum = 0;
      const currentBlocks = suggestedBlocks.slice(i, i + numberOfBlocks);

      // Calculate the sum of amounts for currentBlocks
      for (let j = 0; j < numberOfBlocks; j++) {
        sum += currentBlocks[j].amount;
      }

      // Insert the sum and blocks at the correct position in sorted order
      let index = 0;
      while (index < sums.length && sum > sums[index]) {
        index++;
      }
      sums.splice(index, 0, sum);
      blocks.splice(index, 0, currentBlocks);

      // Keep only the top 3 sums and blocks
      if (sums.length > 3) {
        sums.length = 3;
        blocks.length = 3;
      }
    }

    const result = [];
    for (let i = 0; i < sums.length; i++) {
      result.push({
        sum: sums[i],
        blocks: blocks[i],
      });
    }

    return result;
  };

  return {
    getSuggestions,
  };
}
