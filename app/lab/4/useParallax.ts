"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function useParallax(layers: { selector: string; offsetU: number }[]) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!container.current) return;
      const quickTos = layers.map(({ selector, offsetU }) => ({
        xTo: gsap.quickTo(selector, "x", {
          duration: 0.6,
          ease: "power3",
        }),
        yTo: gsap.quickTo(selector, "y", {
          duration: 0.6,
          ease: "power3",
        }),
        offsetU: selector === ".bg" ? offsetU + 10 : offsetU,
      }));
      const handleMouseMovement = (e: MouseEvent) => {
        if (!container.current) return;

        const rect = container.current.getBoundingClientRect();
        quickTos.forEach(({ xTo, yTo, offsetU }) => {
          if (offsetU > 7) {
            const offsetX = (e.clientX - rect.left - 980) * (offsetU - 10);
            const offsetY =
              (e.clientY - rect.top - 104) * -Math.abs(offsetU - 10);
            xTo(-offsetX);
            yTo(-offsetY);
          } else {
            const offsetX = (e.clientX - rect.left - 980) * offsetU;
            const offsetY = (e.clientY - rect.top - 104) * -Math.abs(offsetU);
            xTo(offsetX);
            yTo(offsetY);
          }
        });
      };

      container.current.addEventListener("mousemove", handleMouseMovement);
      return () => {
        container.current?.removeEventListener(
          "mousemove",
          handleMouseMovement
        );
      };
    },
    { scope: container }
  );
  return { container };
}
