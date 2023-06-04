import { useActivityRate } from "@/hooks/use-activity-rate";
import { useEffect } from "react";

export default ({ eventInfo }) => (
  <div className="h-80 w-72 mt-12 drop-shadow-md border-gray-300 bg-white rounded-lg p-4">
    <div className="text-sm font-bold">{eventInfo.title}</div>
    <div className="mt-4">
      <div className="text-xs font-bold"> Suggested Time:</div>
      <div>
        <div className="mt-2">
          <button className="text-xs flex w-full justify-between p-2 text-green-500 border-green-400 bg-green-200 rounded-lg">
            <div>10:30 - 13:00</div>
            <div> $13</div>
          </button>
        </div>
        <div className="mt-2">
          <button className="text-xs flex w-full justify-between p-2 text-green-500 border-green-400 bg-green-200 rounded-lg">
            <div>10:30 - 13:00</div>
            <div> $13</div>
          </button>
        </div>
        <div className="mt-2">
          <button className="text-xs flex w-full justify-between p-2 text-green-500 border-green-400 bg-green-200 rounded-lg">
            <div>10:30 - 13:00</div>
            <div> $13</div>
          </button>
        </div>
      </div>
    </div>
  </div>
);
