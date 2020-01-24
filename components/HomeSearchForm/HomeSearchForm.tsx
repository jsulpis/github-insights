import React from "react";
import SearchForm, { SearchFormProps } from "../SearchForm/SearchForm";
import "./HomeSearchForm.scss";

function HomeSearchForm(props: SearchFormProps) {
  return (
    <div className="home-search-form">
      <SearchForm searchUser={props.searchUser} />
    </div>
  );
}

export default HomeSearchForm;
