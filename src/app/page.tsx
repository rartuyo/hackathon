"use client";
import AddEvent from "@/components/AddEvent";
import Calendar from "@/components/MyCalendar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <AddEvent />
      <Calendar />
    </main>
  );
}
