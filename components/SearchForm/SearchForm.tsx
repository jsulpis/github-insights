import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import "./SearchForm.scss";

interface SearchFormProps {
  searchUser: (user: string) => any;
}

function SearchForm(props: SearchFormProps) {
  function handleSubmit(event) {
    event.preventDefault();
    const username = (document.querySelector(
      "#username-input"
    ) as HTMLInputElement).value;
    props.searchUser(username);
  }

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          name="username"
          id="username-input"
          placeholder="Enter a username"
        />
      </FormGroup>
      <button id="search-button" type="submit">
        <i className="fas fa-search" />
      </button>
    </Form>
  );
}

export default SearchForm;
