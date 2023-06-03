import { useActivityRate } from "@/hooks/use-activity-rate";
import { useEffect } from "react";

export default function AddEvent() {
  const { getConsumptionRate } = useActivityRate();

  useEffect(() => {
    getConsumptionRate("walking");
  }, []);

  return <div>Add Event</div>;
}
