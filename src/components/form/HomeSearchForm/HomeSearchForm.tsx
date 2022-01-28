import { FC } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import styles from "./HomeSearchForm.module.scss";

export const HomeSearchForm: FC = () => (
  <div className={styles.container}>
    <SearchForm />
  </div>
);
