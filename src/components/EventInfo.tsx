import { format } from "date-fns";

type Event = {
  title: string;
  amount: number;
};
export default function EventInfo({
  eventInfo,
  suggestedBlocks,
}: {
  eventInfo: Event;
  suggestedBlocks: Array<any>;
}) {
  console.log(suggestedBlocks);

  const formatToTime = (date) => {
    return format(new Date(date), "HH:mm");
  };

  return (
    <div className="mt-12 h-80 w-72 rounded-lg border-gray-300 bg-white p-4 drop-shadow-md">
      <div className="text-sm font-bold">{eventInfo.title}</div>
      <div>Consumption Price: {eventInfo.amount}</div>
      <div className="mt-4">
        <div className="text-xs font-bold"> Suggested Time:</div>
        <div>
          {suggestedBlocks &&
            suggestedBlocks.map((block) => (
              <div className="mt-2">
                <button className="flex w-full justify-between rounded-lg border-green-400 bg-green-200 p-2 text-xs text-green-500">
                  <div>
                    {formatToTime(block.blocks[0].valid_from)} -{" "}
                    {formatToTime(
                      block.blocks[block.blocks.length - 1].valid_to
                    )}
                  </div>
                  <div>{Number(block.sum.toFixed(2))}</div>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
