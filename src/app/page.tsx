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
          <Calendar />
        </div>
      </QueryClientProvider>
    </main>
  );
}
