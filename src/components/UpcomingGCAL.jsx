import { useEffect, useState } from "react";

const CAL_ID = import.meta.env.VITE_PUBLIC_GCAL_ID;
const API_KEY = import.meta.env.VITE_PUBLIC_GCAL_KEY;

function formatRange(ev) {
  const start = ev.start.dateTime || ev.start.date;
  const end = ev.end.dateTime || ev.end.date;
  const s = new Date(start);
  const e = new Date(end);
  const sameDay = s.toDateString() === e.toDateString();
  const dateStr = s.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeStr = ev.start.date
    ? "All day"
    : `${s.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })} – ${e.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}`;
  return sameDay
    ? `${dateStr}, ${timeStr}`
    : `${dateStr} – ${e.toLocaleDateString()}`;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        CAL_ID
      )}/events`
    );
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");
    url.searchParams.set("timeMin", new Date().toISOString());
    url.searchParams.set("maxResults", "10");

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error.message);
        setEvents((data.items || []).filter((ev) => ev.status !== "cancelled"));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading events…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!events.length) return <p>No upcoming events.</p>;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="rounded-xl border p-4 shadow-sm bg-white">
            <a
              href={ev.htmlLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold hover:underline text-lg"
            >
              {ev.summary}
            </a>
            <p className="text-sm text-gray-500 mt-1">{formatRange(ev)}</p>
            {ev.location && (
              <p className="text-sm text-gray-600">{ev.location}</p>
            )}
            {ev.description && (
              <p className="text-gray-700 mt-2">{ev.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
