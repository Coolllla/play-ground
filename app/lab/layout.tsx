import styles from "./layout.module.css";

export default function LabLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section className={styles.container}>{children}</section>;
}
