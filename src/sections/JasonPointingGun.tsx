import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TITLE_TOP = 0.55;

const titleClasses =
  "text-yellow font-long uppercase text-6xl text-left py-20 px-40 font-extrabold";

export default function JasonPointingGun() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    gsap.set(".jason-wrapper", { marginTop: "-80vh" });
    gsap.set(".section-text", { y: "20px", opacity: 0 });
    gsap.set(".json-waya", { marginTop: "-100vh" });
    gsap.set(".jasonPointingGun-img-overlay", { opacity: 1 });
    gsap.set(".title-real", { opacity: 0, y: 40 });

    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".jason-wrapper",
        start: "top top",
        scrub: 0.5,
        end: "+=250%",
        pin: true,
      },
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".json-waya",
        start: "top center",
        end: "80% center",
        scrub: 2,
      },
    });

    // Fade out overlay
    tl.to(".jasonPointingGun-img-overlay", {
      opacity: 0,
      ease: "none",
    });

    // Scroll-controlled video playback
    const addVideoAnimation = () => {
      video.currentTime = 0;

      tl.to(
        video,
        {
          currentTime: video.duration,
          duration: 1,
          ease: "none",
        },
        "<",
      );
      tl.to(
        video,
        {
          scale: 1.15,
          duration: 4,
          ease: "none",
        },
        0,
      );

      tl.to(
        ".section-text",
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "<",
      );

      tl.to(
        ".title-real",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power1.out",
        },
        0.6,
      );

      // Hold the remaining animation before fading out
      tl.to({}, { duration: 0.3 }, 4);
      tl.to(".jason-wrapper", { opacity: 0 }, "<");

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      addVideoAnimation();
    } else {
      video.addEventListener("loadedmetadata", addVideoAnimation, {
        once: true,
      });
    }

    // Section 2 animation
    tl2.to(".json-waya .khta", {
      y: -150,
      duration: 2,
      ease: "power1.inOut",
    });

    // Hold the title, then hand it over to section 2
    const title = document.querySelector<HTMLElement>(".title-real");
    const slot = document.querySelector<HTMLElement>(".title-slot");

    if (title && slot) {
      // Phase 1: fixed on screen
      const hold = () => {
        const r = slot.getBoundingClientRect();

        gsap.set(title, {
          position: "fixed",
          top: TITLE_TOP * window.innerHeight,
          left: r.left,
          width: r.width,
        });
      };

      // Phase 2: attached inside the slot
      const attach = () => {
        gsap.set(title, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        });
      };

      ScrollTrigger.create({
        trigger: slot,
        start: `top ${TITLE_TOP * 100}%`,
        end: "max",
        onToggle: (self) => (self.isActive ? attach() : hold()),
        onRefresh: (self) => (self.isActive ? attach() : hold()),
      });
    }
  }, []);

  return (
    <section className="relative">
      <div className="jason-wrapper h-dvh relative overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/pointing-gun.mp4"
          muted
          playsInline
          preload="auto"
          className="size-full object-cover opacity-100"
        />

        <div className="jasonPointingGun-img-overlay absolute inset-0 z-0 bg-[#111117] pointer-events-none" />
      </div>

      <section className="json-waya flex relative p-0 z-9999999 py-40 mt-60 lg:flex-row justify-start gap-5 w-dvw overflow-x-hidden">
        <div className="w-1/2 flex flex-col gap-8 relative -top-[110px]">
          <div className="jason-1">
            <div className="title-slot relative">
              {/* Invisible copy: reserves the exact height */}
              <h1 aria-hidden className={`${titleClasses} invisible`}>
                If anything happens, I'm right behind you.
              </h1>

              <h1
                className={`${titleClasses} title-real absolute top-0 left-0 w-full z-10`}
              >
                If anything happens, I'm right behind you.
              </h1>
            </div>

            <h1 className="text-pink text-left text-4xl py-20 px-40 font-extrabold">
              Another day in paradise, right?
            </h1>

            <img
              src="https://www.rockstargames.com/VI/_next/static/media/Jason_Duval_05.0kxp6enhvzqka.jpg?akim=1&imdensity=1&imwidth=3024"
              className="h-175 object-cover"
            />
          </div>

          <div className="jason-2 justify-items-end">
            <img
              src="/images/jason-2.webp"
              className="aspect-6/9 w-1/2 object-cover"
            />
          </div>
        </div>

        <div className="khta h-full -translate-y-20">
          <div className="text-white w-[500px] py-26 px-10 text-2xl">
            Meeting Lucia could be the best or worst thing to ever happen to
            him. Jason knows how he'd like it to turn out but right now, it's
            hard to tell.
          </div>

          <div className="w-[500px] h-[900px]">
            <img
              className="object-cover h-[1000px] [object-position:18%_center]"
              src="https://www.rockstargames.com/VI/_next/static/media/Jason_Duval_04.16d-z2wa2s~bk.jpg?akim=1&imdensity=1&imwidth=3024"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
