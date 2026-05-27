"use client";
import styles from "./page.module.css";

import { useRef } from "react";
import Cover from "./Cover";
import { useAnimation } from "./useAnimation";
import Brand from "./Brand";
import Link from "next/link";
import BigTitle from "./BigTitle";

function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { onPlay, container } = useAnimation(coverRef, svgRef);

  const handleEnter = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.play();
    onPlay();
  };

  return (
    <div className={styles.container} ref={container}>
      <Cover onPlay={handleEnter} ref={coverRef} />
      <video
        src="../spring.mp4"
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className={styles.backVideo}
      ></video>
      <Brand />
      <ul className={styles.linkList}>
        <li className="link">
          <Link href="#" className={`${styles.link}`}>
            · Home
          </Link>
        </li>
        <li className="link">
          <Link href="#" className={styles.link}>
            · New Chapter
          </Link>
        </li>
        <li className="link">
          <Link href="#" className={styles.link}>
            · The Pre Story
          </Link>
        </li>
      </ul>
      <BigTitle svgRef={svgRef} />
    </div>
  );
}

export default Page;
