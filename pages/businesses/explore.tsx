import React from "react";
// import { useRouter } from "next/router";
import { SearchBar, SearchResults } from "../../src/components/businesses/Search";
// import { SearchQueryContext, useSearchQuery } from "../../src/contexts/SearchQueryContext";


export default props => {
  return (
    <React.Fragment>
      {/* <SearchQueryContext> */}
        <SearchBar />
        <SearchResults />
      {/* </SearchQueryContext> */}
    </React.Fragment>
  );
};
