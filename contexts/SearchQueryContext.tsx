import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const searchQueryContext = createContext({
  search_desc: "",
  search_loc: "",
  search_cat: "",
});

export const useSearchParameters = () => {
  const { search_desc, search_loc, search_cat } = useContext(
    searchQueryContext
  );
  return { search_desc, search_loc, search_cat };
};

const useSearchQuery = () => {
  const { search_desc, search_loc, search_cat } = useRouter().query;

  const [state, setState] = useState<any>(() => {
    return {
      search_desc: "",
      search_loc: "",
      search_cat: "",
    };
  });

  useEffect(() => {
    // if (term) {
    setState({
      search_desc: search_desc ? search_desc : "",
      search_cat: search_cat ? search_cat : "",
      search_loc: search_loc ? search_loc : "",
    });
    // }
  }, [search_desc, search_loc, search_cat]);

  return state;
};

export const SearchQueryConsumer = searchQueryContext.Consumer;
export const SearchQueryProvider = searchQueryContext.Provider;

export const SearchQueryContext = ({ children }) => {
  const searchQuery = useSearchQuery();
  return (
    <SearchQueryProvider value={searchQuery}>{children}</SearchQueryProvider>
  );
};
