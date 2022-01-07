import { FC } from "react";
import styles from "./FadeTransition.module.scss";

export const FadeTransition: FC = ({ children }) => (
  <div className={styles.fade}>{children}</div>
);
