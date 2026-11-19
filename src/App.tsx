import { useEffect } from "react";
import gsap from "gsap";
import "./App.css";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import FirstVideo from "./sections/FirstVideo";
import Jason from "./sections/Jason";
import JasonPointingGun from "./sections/JasonPointingGun";
import SecondVideo from "./sections/SecondVideo";
import Lucial from "./sections/Lucial";
import PostCard from "./sections/PostCard";
import FinalVideo from "./sections/FinalVideo";
import LuciaCar from "./sections/LuciaCar";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false, // GSAP's ticker will drive Lenis instead
    });

    // Keep ScrollTrigger in sync with Lenis's smooth scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (time is in seconds, Lenis expects ms)
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);

    // Prevent GSAP from "catching up" after lag, which causes jumpy scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="">
      <Navbar />
      <Hero />
      <FirstVideo />
      <Jason />
      <JasonPointingGun />
      <SecondVideo />
      <Lucial />

      <LuciaCar />
      <PostCard />
      <FinalVideo />
    </main>
  );
}

export default App;
