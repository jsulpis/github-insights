import { FC } from "react";
import styles from "./Spinner.module.scss";

export const Spinner: FC<{ className?: string }> = ({ className }) => (
  <div className={styles.spinner + " " + className}>
    <div className={styles.bounce1} />
    <div className={styles.bounce2} />
    <div className={styles.bounce3} />
  </div>
);
