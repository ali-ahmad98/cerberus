import styles from "./coming-soon.module.css";

const ComingSoon = () => {
  return (
    <div aria-label="dropdown" className={styles["coming-soon"]}>
      <p className={styles.text}>Coming Soon...</p>
    </div>
  );
};
export default ComingSoon;
