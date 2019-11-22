import React from "react";
import { SearchQueryConsumer } from "../../../contexts/SearchQueryContext";
import { useRouter } from "next/router";
import {
  buildSearchQuery,
  buildSearchQueryCount,
} from "~/services/graphql/queries";
import { useQuery } from "@apollo/react-hooks";

import { Results } from "./Results";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface State {
  count: number | undefined;
  currentPage: number;
  offset: number;
  maxPages: number | undefined;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  count: undefined,
  currentPage: 1,
  maxPages: undefined,
  offset: 0,
};


const useStyles = makeStyles((theme:Theme)=> createStyles({
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set_count": {
      return {
        ...state,
        count: action.payload,
      };
    }

    case "set_max_pages": {
      return {
        ...state,
        maxPages: action.payload,
      };
    }

    case "set_offset": {
      return {
        ...state,
        offset: action.payload,
      };
    }

    case "set_current_page": {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
  }
};

export const SearchResults = (props) => {
  const { search_cat, search_desc, search_loc } = useRouter().query;
  console.log("explore -- ", search_cat, search_desc, search_loc);

  const classes = useStyles(props);

  const options = { locationType: "city" };
  const default_loc = "Houston"; //TODO: set this to the location determined by geolocation or ip lookup


  const SEARCH_COUNT_QUERY = buildSearchQueryCount(options);
  const SEARCH_QUERY = buildSearchQuery(options);
  const variables = {
    location: search_loc ? search_loc : default_loc,
    tag: `%${search_desc}%`,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(SEARCH_COUNT_QUERY, { variables });


  const next = (): void => {
    if (state.currentPage < state.maxPages) {
      dispatch({ type: "set_current_page", payload: state.currentPage + 1 });
    }
  };

  const prev = (): void => {
    if (state.currentPage > 1) {
      dispatch({ type: "set_current_page", payload: state.currentPage - 1 });
    }
  };


  React.useEffect(() => {
    if (data) {
      const { count } = data.businesses_aggregate.aggregate;
      dispatch({ type: "set_count", payload: count });

      const maxPages = Math.ceil(count / 9);
      dispatch({ type: "set_max_pages", payload: maxPages });
    }
  }, [data]);

  React.useEffect(() => {
    const offset = (state.currentPage - 1) * 9;
    dispatch({ type: "set_offset", payload: offset });
  }, [state.currentPage]);

  React.useEffect(() => {
    dispatch({type: "set_current_page", payload: 1});
  }, [search_desc]);


  return (
    <React.Fragment>

      <div>
        { search_desc && (
          <Results
            query={SEARCH_QUERY}
            variables={variables}
            limit={9}
            offset={state.offset}
            />
        )}
      </div>

      <Container className={classes.container}>
          <div>{loading ? "Loading " : state.count} total results</div>
        <Typography variant="body2">
          Current Page: {state.currentPage} / {state.maxPages}
        </Typography>
        <div>
          <Button onClick={prev}>Previous Page</Button>
          <Button onClick={next}>Next Page</Button>
        </div>
      </Container>
    </React.Fragment>
  );
};
