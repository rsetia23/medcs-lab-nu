import CalendarEvents from "./CalendarEvents";


const EventsPage = () => {
  return (
    <>
      <CalendarEvents
        calendarId={import.meta.env.VITE_PUBLIC_GCAL_ID}
        title="MedCS Lab Events"
      />
      <CalendarEvents
        calendarId={import.meta.env.VITE_PUBLIC_GCAL_ID_2}
        title="MedCS Lab Office Hours"
      />
    </>
  );
};

export default EventsPage;

