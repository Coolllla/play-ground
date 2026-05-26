"use client";
import { usePathname } from "next/navigation";
import styles from "./Heading.module.css";
import Link from "next/link";
import { useAnimation } from "./useAnimation";

function Heading() {
  const pathName = usePathname();
  const { container } = useAnimation(pathName !== "/");

  return (
    <nav className={`${styles.container}`} ref={container}>
      <Link href="/" className={`${styles.textBox}  LinkLogo`}>
        For Lab
      </Link>
      <svg
        width="100%"
        height="2px"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        className={styles.svg}
      >
        <line
          x1="0"
          y1="0"
          x2="200"
          y2="0"
          strokeWidth="2"
          className="svgline"
        />
      </svg>
    </nav>
  );
}

export default Heading;
