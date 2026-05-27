import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);
export function useAnimation(
  coverRef: React.RefObject<HTMLDivElement | null>,
  svgRef: React.RefObject<SVGSVGElement | null>
) {
  const container = useRef(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(coverRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
        })
        .set(coverRef.current, { pointerEvents: "none" })
        .from(
          ".link",
          {
            opacity: 0,
            x: -20,
            duration: 0.7,
            ease: "power2.inOut",
            stagger: 0.3,
          },
          43
        )
        .fromTo(
          svgRef.current!.querySelectorAll(".drawPath"),
          {
            drawSVG: "0%",
          },
          {
            drawSVG: "50% 100%",
            ease: "power2.inOut",
            stagger: { amount: 2, from: "random" },
            duration: () => {
              return 0.5 + Math.random() * 3;
            },
          },
          40
        );
    },
    { scope: container }
  );

  const onPlay = () => {
    if (tl) tl.current?.play();
  };

  return { onPlay, container };
}
