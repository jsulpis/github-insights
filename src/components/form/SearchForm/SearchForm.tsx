import { FC } from "react";
import { Button, Form, Input } from "reactstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SearchForm.module.scss";
import { useRouter } from "next/router";

export const SearchForm: FC<{ onBeforeRedirect?: (username: string) => any }> = ({
  onBeforeRedirect
}) => {
  const router = useRouter();
  const username = router.query.username;

  function handleSubmit(event) {
    event.preventDefault();
    const submittedUsername = event.target.elements.username.value;

    if (submittedUsername !== username) {
      onBeforeRedirect?.(submittedUsername);
      router.push("/" + submittedUsername);
    }
  }

  return (
    <Form className={styles.form} inline onSubmit={handleSubmit}>
      <Input
        name="username"
        required
        aria-label="GitHub username"
        autoFocus
        placeholder="Enter a GitHub username"
      />
      <Button>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Form>
  );
};
