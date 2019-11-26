import React from "react";
import { SearchQueryConsumer } from "../../../contexts/SearchQueryContext";
import { useRouter } from "next/router";
import { SEARCH_BUSINESSES, SEARCH_BUSINESSES_COUNT } from "~/services/graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { Results } from "./Results";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const RETURN_LIMIT = 9;

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      width: "100%",
    },
  })
);

const reducer = (state: State, action: Action): State => {
  console.group("[REDUCER]");
  console.log(state);
  console.log(action);
  console.groupEnd();
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

export const SearchResults = props => {
  const {
    search_cat,
    search_desc,
    search_loc,
    page_number,
  } = useRouter().query;

  const classes = useStyles(props);

  //TODO: set this to the location determined by geolocation or ip lookup
  const default_loc = "Houston";

  const variables = {
    area: `%${search_loc ? search_loc : default_loc}%`,
    term: `%${search_desc}%`,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, error, data: countData } = useQuery(SEARCH_BUSINESSES_COUNT, { variables });

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

  //* attempting to update the page number if page_number parameter is present in url;
  React.useEffect(() => {
    console.log("page ", page_number);
    if (page_number) {
      dispatch({ type: "set_current_page", payload: page_number });
    }
  }, [page_number]);


  //* update the indicators at the bottom of the component;
  React.useEffect(() => {
    if (countData) {
      const { count } = countData.businesses_aggregate.aggregate;
      dispatch({ type: "set_count", payload: count });

      const maxPages = Math.ceil(count / RETURN_LIMIT);
      dispatch({ type: "set_max_pages", payload: maxPages });
    }
  }, [countData]);

  //* update the offset when the page number is changed;
  React.useEffect(() => {
    const offset = (state.currentPage - 1) * RETURN_LIMIT;
    dispatch({ type: "set_offset", payload: offset });
  }, [state.currentPage]);

  //* reset to page one when the search_desc query parameter changes;
  React.useEffect(() => {
    dispatch({ type: "set_current_page", payload: 1 });
  }, [search_desc]);

  return (
    <React.Fragment>
      <div>
        {search_desc && (
          <Results
            query={SEARCH_BUSINESSES}
            variables={variables}
            limit={RETURN_LIMIT}
            offset={state.offset}
          />
        )}
      </div>

      <Container className={classes.container}>
        <Typography variant="body2">
          <div>{loading ? <CircularProgress color="secondary" /> : state.count}</div>
          total results
        </Typography>
        <Typography variant="body2">
          Current Page:
          {state.currentPage <= state.maxPages ? state.currentPage : 0} /{" "}
          {state.maxPages}
        </Typography>
        <div>
          <Button onClick={prev}>Previous Page</Button>
          <Button onClick={next}>Next Page</Button>
        </div>
      </Container>
    </React.Fragment>
  );
};
