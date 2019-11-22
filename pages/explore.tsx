import React from "react";
import { useRouter } from "next/router";
import { SearchBar } from "../src/components/Search/SearchBar/SearchBar";
import {SearchResults } from "../src/components/Search/SearchResults/SearchResults";
import { SearchQueryContext, useSearchQuery } from "../src/contexts/SearchQueryContext";


export default props => {
  return (
    <React.Fragment>
      <SearchQueryContext>
        <h2>Explore</h2>
        <SearchBar />
        <SearchResults />
      </SearchQueryContext>
    </React.Fragment>
  );
};
