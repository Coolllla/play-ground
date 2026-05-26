import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

export function useAnimation() {
  const container = useRef(null);
  // const tl = useRef<gsap.core.Timeline | null>(null);
  const { contextSafe } = useGSAP({ scope: container });
  const onPlay = contextSafe(() => {
    gsap.fromTo(
      ".drawPath",
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
      }
    );
  });

  return { onPlay, container };
}
