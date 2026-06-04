import LinkCard from "./_components/LinkCard";
import styles from "./page.module.css";

const cardArr: [number, string][] = [
  [1, "专勇"],
  [2, "专勇2"],
  [3, "首屏"],
  [4, "视差"],
];

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      {cardArr.length > 0
        ? cardArr.map((arr) => (
            <LinkCard id={arr[0]} name={arr[1]} key={arr[0]} />
          ))
        : "Nothing yet"}
    </div>
  );
}
