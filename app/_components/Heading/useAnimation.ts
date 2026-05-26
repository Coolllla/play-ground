import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

export function useAnimation(siginal: boolean) {
  const container = useRef(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(".LinkLogo", {
          xPercent: -200,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .from(
          ".svgline",
          {
            drawSVG: "9% 15%",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<"
        );
    },
    { scope: container }
  );

  useGSAP(() => {
    if (siginal) tl.current?.play();
    else tl.current?.reverse();
  }, [siginal]);

  return { container };
}
