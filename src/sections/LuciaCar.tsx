import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LuciaCar() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    gsap.set(".lucia-car-vd-overlay", {
      opacity: 1,
    });

    gsap.set(".lucia-car-wrapper", {
      marginTop: "-100vh",
    });
    const video = videoRef.current;
    if (!video) return;

    const initializeAnimation = () => {
      //   gsap.to(".second-vd-overlay", {
      //     opacity: 0,
      //     ease: "none",
      //   });
      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: ".lucia-car-wrapper",
          start: "top top",
          end: "end top",
          scrub: 0.5,
          pin: true,
        },
      });
    };

    // readyState 2 = first frame is decoded (same state "loadeddata" waits for)
    if (video.readyState >= 2) {
      initializeAnimation();
    } else {
      video.addEventListener("loadeddata", initializeAnimation, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("loadeddata", initializeAnimation);
    };
  }, []);

  return (
    <section className="lucia-car-wrapper  h-dvh relative">
      <div className="h-dvh relative">
        <video
          ref={videoRef}
          src="/videos/lucia-car.mp4"
          muted
          playsInline
          preload="auto"
          className="lucia-vd size-full object-cover"
        />
        <div className="lucia-car-vd-overlay absolute inset-0 z-10 bg-[#111117] pointer-events-none" />
      </div>
    </section>
  );
}
