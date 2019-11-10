import React from "react";
import { useRouter } from "next/router";
import { SearchBar } from "../src/components/SearchBar/SearchBar";

import Container from "@material-ui/core/Container";

export default props => {
  return (
    <Container maxWidth="lg">
      <h2>Explore</h2>
      <SearchBar />
    </Container>
  );
};
