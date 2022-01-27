import { FC } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import styles from "./HomeSearchForm.module.scss";

export const HomeSearchForm: FC<{ searchUser: (user: string) => any }> = props => (
  <div className={styles.container}>
    <SearchForm {...props} />
  </div>
);
