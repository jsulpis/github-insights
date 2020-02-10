import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import "./SearchForm.scss";

export interface SearchFormProps {
  searchUser: (user: string) => any;
}

function SearchForm(props: SearchFormProps) {
  function handleSubmit(event) {
    event.preventDefault();
    // @ts-ignore
    const username = document.querySelector("#username-input").value;
    props.searchUser(username);
  }

  return (
    <Form className="username-form" inline onSubmit={handleSubmit}>
      <FormGroup className="username-formgroup">
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
