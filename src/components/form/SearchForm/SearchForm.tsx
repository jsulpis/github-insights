import { FC } from "react";
import { Button, Form, Input } from "reactstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SearchForm.module.scss";

export interface SearchFormProps {
  searchUser: (user: string) => any;
}

export const SearchForm: FC<SearchFormProps> = ({ searchUser }) => {
  function handleSubmit(event) {
    event.preventDefault();
    searchUser(event.target.elements.username.value);
  }

  return (
    <Form className={styles.form} inline onSubmit={handleSubmit}>
      <Input name="username" required autoFocus placeholder="Enter a GitHub username" />
      <Button>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Form>
  );
};
