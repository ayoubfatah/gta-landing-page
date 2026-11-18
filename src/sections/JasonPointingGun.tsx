import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function JasonPointingGun() {
  useGSAP(() => {
    gsap.set(".jason-wrapper", { marginTop: "-80vh" });
    gsap.set(".section-text", { y: "20px", opacity: 0 });
    gsap.set(".json-waya", { marginTop: "-100vh" });
    gsap.set(".jasonPointingGun-img-overlay", {
      opacity: 1,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".jason-wrapper",
        start: "top top",
        scrub: 2.5,
        end: "+=290%",
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

    tl.to(".jasonPointingGun-img-overlay", {
      opacity: 0,
      ease: "none",
    });
    tl.to(
      ".jason-gun-img",
      {
        scale: 1.2,
      },
      0.2,
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
    tl.to({}, { duration: 0.3 });

    tl.to(
      ".jason-wrapper",
      {
        opacity: 0,
      },
      "<",
    );

    tl2.to(".json-waya  .khta ", {
      scrollTrigger: {
        trigger: ".json-waya",
        start: "top center",
        end: "70% center",
        scrub: 2,
      },
      y: -150,
      duration: 2,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <section className="relative  ">
      <div className="jason-wrapper relative overflow-hidden">
        <img
          className="jason-gun-img object-cover"
          src="/images/jason-gun.png"
          alt="jason pointing a gun at someone"
        />

        <p className="section-text fixed top-[70%] right-[50%] text-5xl w-125 font-extrabold text-yellow uppercase">
          "If anything happens, I'm right behind you. "
        </p>
        <div className="jasonPointingGun-img-overlay absolute inset-0 z-0 bg-[#111117] pointer-events-none" />
      </div>

      <section className=" json-waya flex  relative  p-0  z-9999999   py-40 mt-60   lg:flex-row justify-start gap-5 w-dvw overflow-x-hidden">
        <div className="  w-1/2  flex flex-col gap-8 translate-y-[-110px]">
          <div className="jason-1    ">
            <h1 className=" text-pink  text-center  text-4xl  py-20 px-60 font-extrabold ">
              {" "}
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
              className="aspect-6/9 w-1/2 object-cover "
            />
          </div>
        </div>

        <div className="khta h-full -translate-y-20">
          <div className="text-white w-[500px] py-26 px-10 text-2xl ">
            Meeting Lucia could be the best or worst thing to ever happen to
            him. Jason knows how he'd like it to turn out but right now, it's
            hard to tell.
          </div>
          <div className=" w-[500px]  h-[900px]">
            <img
              className="object-cover h-[1000px]  [object-position:18%_center]"
              src="https://www.rockstargames.com/VI/_next/static/media/Jason_Duval_04.16d-z2wa2s~bk.jpg?akim=1&imdensity=1&imwidth=3024"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
