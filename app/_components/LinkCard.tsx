import Link from "next/link";
import styles from "./LinkCard.module.css";

function LinkCard({ id, name }: { id: number; name?: string }) {
  return (
    <Link className={styles.linkCard} href={`lab/${id}`}>
      {name ?? "test"}
    </Link>
  );
}

export default LinkCard;
