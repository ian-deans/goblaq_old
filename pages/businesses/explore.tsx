import React from "react";
import {
  SearchBar,
  SearchResults,
} from "../../src/components/businesses/Search";

export default props => {
  return (
    <React.Fragment>
      <SearchBar />
      <SearchResults />
    </React.Fragment>
  );
};
