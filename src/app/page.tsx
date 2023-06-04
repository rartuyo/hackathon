"use client";
import Calendar from "@/components/MyCalendar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 50 * (60 * 1000),
      cacheTime: 60 * (60 * 1000),
    },
  },
});

export default function Home() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <div>
          <div className="w-full text-center py-6 bg-green-200 font-bold">
            Green Calendar 📆
          </div>
          <Calendar />
        </div>
      </QueryClientProvider>
    </main>
  );
}
