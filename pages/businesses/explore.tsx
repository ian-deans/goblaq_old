import React from "react";
import {
  SearchBar,
  SearchResults,
} from "../../src/components/businesses/Search";
import { Page } from "../Page"


export default props => {
  return (
    <Page>
      <SearchBar />
      <SearchResults />
    </Page>
  );
};
