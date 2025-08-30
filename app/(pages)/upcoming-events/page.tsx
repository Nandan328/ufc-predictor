"use client";

import { useEffect, useState } from "react";
import { Events } from "../../lib/types";
import fighters from "@data/data.json";
import EventCard from "@/components/EventCard";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/get-upcoming-events");
        let data = await response.json();
        data = data.map((event: Events) => {
          const fighter = fighters.find((f) => f.id === event.b_id);
          if (fighter) {
            return {
              ...event,
              b_img: fighter.img,
              b_record:
                fighter.wins + "/" + fighter.losses + "/" + fighter.draws,
              b_stance: fighter.stance,
              b_nickname: fighter.nick_name,
            };
          }
          return event;
        });
        data = data.map((event: Events) => {
          const fighter = fighters.find((f) => f.id === event.r_id);
          if (fighter) {
            return {
              ...event,
              r_img: fighter.img,
              r_record:
                fighter.wins + "/" + fighter.losses + "/" + fighter.draws,
              r_stance: fighter.stance,
              r_nickname: fighter.nick_name,
            };
          }
          return event;
        });
        setEvents(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-3 md:p-6">
      <h1 className="text-3xl font-bold">Upcoming Events</h1>
      <p className="text-sm text-gray-500 m-1 mb-5">*These are predicted winners</p>
      <div>
        {events.length === 0 ? (
          <p className="text-sm text-black">No upcoming events found.</p>
        ) : (
          <div className="grid">
            {events.map((e: Events) => (
              <div
                key={e.b_id}
                className="grid grid-cols-19 md:gap-3 w-full h-full"
              >
                <EventCard e={e} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
