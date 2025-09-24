import About from "./components/About";
import Events from "./components/Events";
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
      <Events />
      <LabUpdates />
      <OurTeam />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}

export default App;
