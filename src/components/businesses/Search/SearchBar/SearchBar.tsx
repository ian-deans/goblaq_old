import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useSearchParameters } from "~/contexts/SearchQueryContext";
import Button from "@material-ui/core/Button";
import { useLocation } from "~/contexts/LocationContext";

//^ VARIABLES
const exploreURL = "/businesses/explore";

//^ STYLE
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      justifyContent: "stretch",
      alignItems: "stretch",
      width: "100%",
      marginTop: "2rem",
      backgroundColor: theme.palette.common.white,
      [theme.breakpoints.down("sm")]: {
        alignItems: "center",
        padding: "0 1em",
      },
    },
    inputCol: {
      width: "90%",
      display: "flex",
      alignItems: "stretch",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        width: "80%",
      },
    },
    searchField: {
      // flexGrow: 2,
      marginRight: "1em",
      width: "100%",
      // borderRadius: "4px 0 0 4px",
      [theme.breakpoints.down("sm")]: {
        borderRadius: "4px 0 0 4px !important",
      },
    },
    input: {
      // borderRadius: "4px",
      // borderRadius: "4px 0 0 4px",
      // [theme.breakpoints.down("sm")]: {
      //   borderRadius: "4px 0 0 4px !important",
      // },
    },

    btn: {
      "-webkit-box-flex": "1 0 auto",
      "-ms-flex": "1 0 auto",
      flex: "1 0 auto",
      height: "100%",
      boxShadow: "none",
      ["&:hover"]: {
        boxShadow: "none",
      },
      // borderRadius: "0 4px 4px 0",
      [theme.breakpoints.down("sm")]: {
        borderRadius: "0 4px 4px 0",
        maxWidth: "40px"
      },
    },
    divider: {
      height: 28,
      margin: 4,
    },
    menu: {},
  })
);

export const SearchBar: React.FunctionComponent = (props: any) => {
  // Collect data through hooks
  const classes = useStyles(props);
  const router = useRouter();
  const { location } = useLocation();

  const [state, setState] = useState<any>({ search_desc: "", search_loc: "" });
  const [city, setCity] = useState<any>(undefined);

  React.useEffect(() => {
    if (location) {
      const city = location.features[0].text;
      console.info("Setting location to ", city);
      setCity(city);
    }
  }, [location]);

  // come to the conclusion that SearchBar doesn't
  // give a shit about the search category
  // const { search_desc, search_loc } = useSearchParameters();

  // update search
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!state.search_loc) {
      return router.push({
        pathname: exploreURL,
        query: { ...state, search_loc: city },
      });
    }

    return router.push({ pathname: exploreURL, query: { ...state } });
  };

  // const inputProps = {
  //   className: classes.input,
  //   value: state.search_desc,
  //   name: "search_desc",
  //   onChange: handleChange,
  // };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div style={{display: "flex", height: "100%", width: "100%"}}>

      <div className={classes.inputCol}>
        <TextField
          variant="outlined"
          // placeholder={search_desc || "What are you looking for?"}
          label="What are you looking for?"
          color="secondary"
          className={classes.searchField}
          inputProps={{
            className: classes.input,
            value: state.search_desc,
            name: "search_desc",
            onChange: handleChange,
          }}
        />
        <TextField
          variant="outlined"
          // placeholder={search_loc || "Where are you looking?"}
          label="Where are you looking?"
          color="secondary"
          className={classes.searchField}
          inputProps={{
            className: classes.input,
            value: state.search_loc,
            name: "search_loc",
            onChange: handleChange,
          }}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        aria-label="search"
        color="secondary"
        // size="large"
        className={classes.btn}
      >
        <SearchIcon />
      </Button>
      </div>

    </form>
  );
};
