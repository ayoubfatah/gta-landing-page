import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function SecondVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    gsap.set(".second-vd-overlay", {
      opacity: 1,
    });
    gsap.set(".second-vd-wrapper", {
      marginTop: "-100vh",
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".second-vd-wrapper",
        start: "top top",
        end: "+=250%",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".second-vd-overlay", {
      opacity: 0,
      ease: "none",
    });

    if (!videoRef.current) return;

    videoRef.current.onloadeddata = () => {
      tl.to(
        videoRef.current,
        {
          currentTime: videoRef.current!.duration,
          duration: 8,
          ease: "none",
        },
        "<",
      );
    };
  }, []);

  return (
    <section className="second-vd-wrapper relative">
      <div className="h-dvh relative">
        <video
          ref={videoRef}
          src="/videos/output2.mp4"
          muted
          playsInline
          preload="auto"
          className="second-vd size-full object-cover opacity-100"
          style={{ objectPosition: "30% 0%" }}
        />

        <div className="second-vd-overlay absolute inset-0 z-10 bg-[#111117] pointer-events-none" />
      </div>
    </section>
  );
}
