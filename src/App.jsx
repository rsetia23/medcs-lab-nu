import About from "./components/About";
import EventsPage from "./components/EventsPage";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import OurTeam from "./components/OurTeam";
import LabUpdates from "./components/LabUpdates";
import NewsletterSignup from "./components/NewsletterSignup";

function App() {
  return (
    <div>
      <Intro />
      <About />
      <EventsPage />
      <LabUpdates />
      <OurTeam />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}

export default App;
