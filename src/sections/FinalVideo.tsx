import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function FinalVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    gsap.set(".final-content", {
      opacity: 0,
    });
    // gsap.set(".details", {
    //   scale: 0.9,
    // });

    gsap.timeline({
      scrollTrigger: {
        trigger: ".final",
        start: "top top",
        end: "180% top",
        scrub: true,
        pin: true,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".final",
        start: "top 80%",
        end: "100% top",
        scrub: true,
      },
    });

    tl.to(".final-content", {
      opacity: 1,
      ease: "power1.inOut",
    });

    if (!videoRef.current) return;

    videoRef.current.onloadeddata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current?.duration,
        duration: 5,
        ease: "power1.inOut",
      });

      tl.to(".date-section", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      });

      tl.to(
        ".details",
        {
          scale: 0.8,
          duration: 2,
          ease: "power1.inOut",
        },
        "<",
      );
    };
  });
  return (
    <section>
      <section className="final relative z-999 ">
        <div className="final-content size-full">
          <video
            ref={videoRef}
            src="/videos/output3.mp4"
            muted
            playsInline
            preload="auto"
            className="size-full object-cover"
          ></video>
        </div>

        <div className="date-section opacity-0 h-screen absolute inset-0  bg-black z-99999">
          <div className="details h-full flex flex-col justify-center items-center gap-20">
            <img
              src="/images/logo.webp"
              alt="Logo"
              className=" 2xl:w-72 3xl:w-80 md:w-60 w-48 absolute xs:top-[9.5rem] sm:top-[12.8rem] md:top-[8.5rem] 2xl:top-44 3xl:top-48 left-1/2 -translate-x-1/2"
            />

            <div className="mt-40">
              <h3 className="text-center uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 text-5xl md:text-[8rem] leading-[4.5rem] md:leading-[7rem]">
                Coming <br /> November 19 <br /> 2026
              </h3>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
