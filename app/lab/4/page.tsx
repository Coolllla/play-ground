"use client";
import styles from "./page.module.css";

import Image from "next/image";
import { useParallax } from "./useParallax";

export default function Page() {
  const quickTos = [
    { selector: ".bg", offsetU: -0.003 },
    { selector: ".bearu", offsetU: -0.003 },
    { selector: ".worl", offsetU: -0.01 },
    { selector: ".duke", offsetU: -0.005 },
    { selector: ".dorath", offsetU: -0.01 },
  ];
  const { container } = useParallax(quickTos);
  return (
    <div className={styles.container} ref={container}>
      <Image
        src="/../bg.jpg"
        alt="backgroundImage"
        fill
        objectFit="cover"
        className={`${styles.bg} bg`}
        sizes="100vw, 50vw"
      />
      <Image
        src="/../4.png"
        alt="bearu"
        fill
        objectFit="contain"
        className={`${styles.pic} bearu`}
        sizes="100vw, 50vw"
      />
      <Image
        src="/../3.png"
        alt="duke"
        fill
        objectFit="contain"
        className={`${styles.pic} duke`}
        sizes="100vw,50vw"
      />
      <Image
        src="/../1.png"
        alt="worl"
        fill
        objectFit="contain"
        className={`${styles.pic} worl`}
        sizes="100vw,50vw"
      />
      <Image
        src="/../2.png"
        alt="dorath"
        fill
        objectFit="contain"
        className={`${styles.pic} dorath`}
        sizes="100vw,50vw"
      />
    </div>
  );
}
