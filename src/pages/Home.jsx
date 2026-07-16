import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import CoreFocusStrip from "../components/sections/CoreFocusStrip";
import UpcomingEventsPreview from "../components/sections/UpcomingEventsPreview";
import MottoBanner from "../components/sections/MottoBanner";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <CoreFocusStrip />
      <UpcomingEventsPreview />
      <MottoBanner />
    </div>
  );
}
