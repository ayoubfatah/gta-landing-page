import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function FirstVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    gsap.set(".first-vd-wrapper", {
      marginTop: "-150vh",
      opacity: 0,
    });
    gsap.set(".first-vd", {
      filter: "blur(50px)",
    });
    gsap.set(".video-text", {
      maskImage:
        "radial-gradient(circle at 50% 100vh, black 32%, transparent 26%)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".first-vd-wrapper",
        start: "top top",
        end: "+=250% top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".hero-section", {
      opacity: 0,
      delay: 0.5,
      ease: "power1.inOut",
    });
    tl.to(".first-vd-wrapper", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });

    if (!videoRef.current) return;

    videoRef.current.onloadeddata = () => {
      tl.addLabel("vid", 1);

      tl.to(
        videoRef.current,
        {
          currentTime: videoRef.current?.duration,
          duration: 8,
          ease: "power1.inOut",
        },
        "vid",
      );
      tl.to(
        ".video-text",
        {
          maskImage:
            "radial-gradient(circle at 50% 100vh, black 87%, transparent 101%)",
          duration: 1.8,
          ease: "power1.inOut",
        },
        "vid-=0.3", // starts 0.5 before the label, ends exactly at "vid"
      );

      tl.to(
        ".video-text",
        { opacity: 0, duration: 0.5, ease: "power1.inOut" },
        "vid+=2.5", // mask ends at vid+1.8, so this holds the text for 0.7 before it fades
      );

      tl.to(
        ".first-vd",
        { filter: "blur(0px)", duration: 0.5 },
        "vid+=3", // starts when the text fade-out ends (vid+3.0)
      );
    };
  }, []);
  return (
    <section className="first-vd-wrapper">
      <div className="h-dvh relative">
        <div style={{}} className="abs-center video-text  z-9999999">
          <h1 className="gta-text  font-extrabold text-[90px]">
            Vice City , USA
          </h1>
          <p className=" gta-text font-extrabold text-[30px] ">
            Jason and lucia have always known the deck is stacked against them.
            But when an easy score goes wrong, they find themselves on the
            darkest side of the sunniest place in America, in the middle of
            criminal conspiracy stretching across the state of Leonida - forced
            to rely on each other more than ever if they want to make it out
            alive
          </p>
        </div>
        <video
          ref={videoRef}
          src="/videos/output1.mp4"
          muted
          playsInline
          preload="auto"
          className="first-vd"
        ></video>
      </div>
    </section>
  );
}
