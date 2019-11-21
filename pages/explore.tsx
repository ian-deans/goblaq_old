import React from "react";
import { useRouter } from "next/router";
import { SearchBar } from "../src/components/Search/SearchBar/SearchBar";
import {SearchResults } from "../src/components/Search/SearchResults/SearchResults";
import { SearchQueryContext, useSearchQuery } from "../src/contexts/SearchQueryContext";


export default props => {
  const {search_cat, search_desc, search_loc} = useRouter().query;
  console.log("explore -- ", search_cat, search_desc, search_loc)
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
