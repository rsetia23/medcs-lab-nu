import React, { useEffect, useState } from "react";
import { FaRegCalendarPlus } from "react-icons/fa";

const CAL_ID = import.meta.env.VITE_PUBLIC_GCAL_ID;
const API_KEY = import.meta.env.VITE_PUBLIC_GCAL_KEY;

const formatReadableDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatReadableTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const getCalendarURL = (event) => {
  const start = event.start.dateTime || event.start.date;
  const end = event.end.dateTime || event.end.date;

  const details = {
    action: "TEMPLATE",
    text: encodeURIComponent(event.summary),
    dates: `${start.replace(/[-:]|\.\d{3}/g, "")}/${end.replace(
      /[-:]|\.\d{3}/g,
      ""
    )}`,
    details: encodeURIComponent(event.description || ""),
    location: encodeURIComponent(event.location || ""),
  };

  const queryString = Object.entries(details)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

  return `https://www.google.com/calendar/render?${queryString}`;
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGCAL = async () => {
      try {
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

        const res = await fetch(url);
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);

        const sortedEvents = (data.items || [])
          .filter((ev) => ev.status !== "cancelled")
          .sort(
            (a, b) =>
              new Date(a.start.dateTime || a.start.date) -
              new Date(b.start.dateTime || b.start.date)
          );

        setEvents(sortedEvents);
      } catch (err) {
        console.error("Google Calendar fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGCAL();
  }, []);

  return (
    <section id="events" className="w-full bg-gray-50 text-gray-900 px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-medcsblue mb-12">
        Upcoming Events
      </h2>

      <div className="max-w-3xl mx-auto">
        {loading ? (
          <p className="text-gray-500 text-center">Loading events…</p>
        ) : !events.length ? (
          <p className="text-gray-500 text-center">No upcoming events.</p>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h4 className="text-xl font-bold text-medcsblue">
                  {event.summary}
                </h4>
                <p className="text-sm text-gray-600 italic">
                  {formatReadableDate(event.start.dateTime || event.start.date)}
                  {event.start.dateTime && (
                    <>
                      , {formatReadableTime(event.start.dateTime)} –{" "}
                      {formatReadableTime(event.end.dateTime)}
                    </>
                  )}
                  <br />
                  {event.location}
                </p>
                {event.description && (
                  <p className="mt-2 text-gray-800">{event.description}</p>
                )}
                <a
                  href={getCalendarURL(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-medcsblue hover:text-blue-600 transition mt-3"
                  aria-label={`Add ${event.summary} to Google Calendar`}
                  title="Add to Google Calendar"
                >
                  <FaRegCalendarPlus size={20} />
                  Add to Calendar
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
