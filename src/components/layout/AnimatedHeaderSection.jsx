import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedTextLines } from "../ui/AnimatedTextLines";

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const titleParts = title.includes(" ") ? title.split(" ") : [title];

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });

    timeline.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });

    timeline.from(
      headerRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`px-4 text-sm font-light tracking-[0.5rem] uppercase md:px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-4 md:px-10">
            <h1
              className={`banner-text-responsive block uppercase ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-4 md:px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 text-end sm:py-16">
          <AnimatedTextLines
            text={text}
            className={`value-text-responsive font-light uppercase ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
