import React from "react";
import { useRouter } from "next/router";
import { SearchBar } from "../src/components/SearchBar/SearchBar";

export default props => {
  const router = useRouter();
  console.log(router.query)
  return (
    <div>
      <SearchBar />
      <h2>Explore</h2>
    </div>
  );
};
