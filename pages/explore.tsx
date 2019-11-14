import React from "react";
import { SearchBar } from "../src/components/Search/SearchBar/SearchBar";
import {SearchResults } from "../src/components/Search/SearchResults/SearchResults";
import { SearchQueryContext } from "../src/contexts/SearchQueryContext";


export default props => {
  return (
    <div>
      <SearchQueryContext>
        <h2>Explore</h2>
        <SearchBar />
        <SearchResults />
      </SearchQueryContext>
    </div>
  );
};
