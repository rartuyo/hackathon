import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type Consumption = {
  amount: number;
  valid_from: Date;
  valid_to: Date;
};

const fetchRate = async () => {
  const charges = await fetch(
    "https://kraken-japan-hackathon-api.onrender.com/products/AGILE-23-06-01/product_rates/consumption_charges"
  );

  return charges.json();
};

export default function useCalculateAmount() {
  const [amount, setAmount] = useState<number>();
  const [rates, setRates] = useState([]);
  useQuery(
    "charges",
    async function () {
      return await fetchRate();
    },
    {
      onSuccess(res) {
        setRates(res);
      },
    }
  );

  function calculate(startTime: Date, endTime: Date) {
    const totalAmount = rates.reduce((sum: number, entry: Consumption) => {
      const entryStartTime = new Date(entry.valid_from);
      const entryEndTime = new Date(entry.valid_to);

      if (entryStartTime >= startTime && entryEndTime <= endTime) {
        return sum + entry.amount;
      }

      return sum;
    }, 0);
    setAmount(Number(totalAmount.toFixed(2)));
  }

  return {
    amount,
    calculate,
  };
}
