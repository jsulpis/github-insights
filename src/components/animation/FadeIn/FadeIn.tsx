import { FC } from "react";
import styles from "./FadeIn.module.scss";

export const FadeIn: FC = ({ children }) => <div className={styles.fade}>{children}</div>;
