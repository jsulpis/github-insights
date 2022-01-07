import { FC } from "react";
import { SearchForm, SearchFormProps } from "../SearchForm/SearchForm";
import styles from "./HomeSearchForm.module.scss";

export const HomeSearchForm: FC<SearchFormProps> = props => (
  <div className={styles.container}>
    <SearchForm {...props} />
  </div>
);
