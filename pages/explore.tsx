import React from "react";
import { useRouter } from "next/router";
import { SearchBar } from "../src/components/Search/SearchBar/SearchBar";
import {SearchResults } from "../src/components/Search/SearchResults/SearchResults";
import { SearchQueryContext } from "../contexts/SearchQueryContext";

import Container from "@material-ui/core/Container";

export default props => {
  return (
    <Container maxWidth="lg">
      <SearchQueryContext>
        <h2>Explore</h2>
        <SearchBar />
        <SearchResults />
      </SearchQueryContext>
    </Container>
  );
};
