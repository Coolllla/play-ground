"use client";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";

function LabContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  const isLabDetail = pathName.includes("/lab");

  return (
    <main className={`${styles.main} ${isLabDetail ? styles.lab : ""}`}>
      {children}
    </main>
  );
}

export default LabContainer;
