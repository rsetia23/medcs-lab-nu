import React, { useEffect, useState } from "react";
import { FaRegCalendarPlus } from "react-icons/fa";
import client from "../sanityClient"; // Make sure this uses `createClient`

const formatReadableDate = (isoDate) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);
  return localDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatReadableTime = (timeStr) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const getCalendarURL = (event) => {
  const formatDateTime = (date, time) => {
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    const local = new Date(year, month - 1, day, hour, minute);
    return local.toISOString().replace(/[-:]|\.\d{3}/g, "");
  };

  const start = formatDateTime(event.date, event.startTime);
  const end = formatDateTime(event.date, event.endTime);

  const details = {
    action: "TEMPLATE",
    text: encodeURIComponent(event.title),
    dates: `${start}/${end}`,
    details: encodeURIComponent(event.description || ""),
    location: encodeURIComponent(event.location || ""),
  };

  const queryString = Object.entries(details)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

  return `https://www.google.com/calendar/render?${queryString}`;
};

const EventsAndUpdates = () => {
  const [events, setEvents] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsQuery = `*[_type == "event"] | order(date asc)`;
        const updatesQuery = `*[_type == "update"] | order(date desc)`;

        const [eventResult, updateResult] = await Promise.all([
          client.fetch(eventsQuery),
          client.fetch(updatesQuery),
        ]);

        setEvents(eventResult);
        setUpdates(updateResult);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="events" className="w-full bg-gray-50 text-gray-900 px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-medcsblue mb-12">
        Events & Updates
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Events Section */}
        <div>
          <h3 className="text-2xl font-semibold text-medcsblue mb-4">
            Upcoming Events
          </h3>
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h4 className="text-xl font-bold text-medcsblue">{event.title}</h4>
                <p className="text-sm text-gray-600 italic">
                  {formatReadableDate(event.date)},{" "}
                  {formatReadableTime(event.startTime)} –{" "}
                  {formatReadableTime(event.endTime)}
                  <br />
                  {event.location}
                </p>
                <p className="mt-2 text-gray-800">{event.description}</p>
                <a
                  href={getCalendarURL(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-medcsblue hover:text-blue-600 transition mt-3"
                  aria-label={`Add ${event.title} to Google Calendar`}
                  title="Add to Google Calendar"
                >
                  <FaRegCalendarPlus size={20} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Updates Section */}
        <div>
          <h3 className="text-2xl font-semibold text-medcsblue mb-4">
            Recent Updates
          </h3>
          <div className="space-y-6">
            {updates.map((update, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h4 className="text-xl font-bold text-medcsblue">{update.title}</h4>
                <p className="text-sm text-gray-600 italic">
                  {formatReadableDate(update.date)}
                </p>
                <p className="mt-2 text-gray-800">{update.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsAndUpdates;
