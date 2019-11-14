import React from "react";
import {SearchQueryConsumer} from "../../../contexts/SearchQueryContext";

export const SearchResults = () => {
  return (
    <SearchQueryConsumer>
      {({ search_desc, search_loc, search_cat }) => (
        <div>
          <div>Search Description: {search_desc}</div>
          <div>Search Location: {search_loc}</div>
          <div>Search Category: {search_cat}</div>
        </div>
      )}
    </SearchQueryConsumer>
  );
};
