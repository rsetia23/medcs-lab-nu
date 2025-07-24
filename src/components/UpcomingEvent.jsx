import React, { useEffect, useState } from "react";

const UpcomingEvent = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(
      "https://public-api.wordpress.com/wp/v2/sites/medcslabnu.wordpress.com/posts?tags=5784&per_page=1"
    )
      .then((res) => res.json())
      .then((data) => setEvent(data[0]))
      .catch((err) => console.error("Error fetching event:", err));
  }, []);

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Upcoming Event</h2>
      {event ? (
        <div
          style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <h3
            style={{ color: "#2D4CE1" }}
            dangerouslySetInnerHTML={{ __html: event.title.rendered }}
          />
          <div
            style={{ marginTop: "1rem" }}
            dangerouslySetInnerHTML={{ __html: event.content.rendered }}
          />
        </div>
      ) : (
        <p>Loading upcoming event...</p>
      )}
    </section>
  );
};

export default UpcomingEvent;
