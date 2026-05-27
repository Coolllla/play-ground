import styles from "./cover.module.css";

function Cover({
  onPlay,
  ref,
}: {
  onPlay: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className={styles.cover} ref={ref}>
      <button className={styles.button} onClick={onPlay}>
        Go ON
      </button>
    </div>
  );
}

export default Cover;
