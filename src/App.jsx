import About from "./components/About";
import EventsAndUpdates from "./components/EventsAndUpdates";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import OurTeam from "./components/OurTeam";
import Projects from "./components/Projects";
import UpcomingEvent from "./components/UpcomingEvent";

function App() {
  return (
    <div>
      <Intro />
      <About />
      <EventsAndUpdates />
      {/* <UpcomingEvent /> */}
      <Projects />
      <OurTeam />
      <Footer />
    </div>
  );
}


export default App;
