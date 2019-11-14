import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Container from "@material-ui/core/Container";
// import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
// import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

import { useSearchParameters } from "../../../contexts/SearchQueryContext";

const USStates = ["CA", "NY", "TX", "PA"];
//! This will be replaced with data from Hasura
const regions = USStates.map(abbr => ({ value: abbr, label: abbr }));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      justifyContent: "space-around",
      justifyItems: "stretch",
      alignItems: "center",
      width: "100%",
      marginTop: "2rem",
      flexWrap: "wrap",
    },
    searchField: {
      flexGrow: 2,
    },
    input: {
      paddingLeft: theme.spacing(1),
    },

    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    select: {
      paddingLeft: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(2),
      minWidth: "80px",
      maxWidth: "100px",
      flexGrow: 1,
    },
    menu: {},
  })
);


export const SearchBar: React.FunctionComponent = (props: any) => {
  // Collect data through hooks
  const classes = useStyles(props);
  const router = useRouter();
  const [state, setState] = useState<any>({ search_desc: "", search_loc: "" });

  // come to the conclusion that SearchBar doesn't
  // give a shit about the search category
  const { search_desc, search_loc } = useSearchParameters();

  // update search 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //? to force location selection, or not to force location selection...
    if (!state.search_loc) {
      console.error("No state selected");
      return;
    }
    router.push({ pathname: "/explore", query: { ...state } });
  };

  const inputProps = {
    className: classes.input,
    value: state.search_desc,
    name: "search_desc",
    onChange: handleChange,
  };


  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        className={classes.searchField}
        variant="outlined"
        placeholder={search_desc || "What are you looking for?"}
        inputProps={inputProps}
      />
      <Box>
        <TextField
          select={true}
          placeholder={search_loc || "Area"}
          variant="outlined"
          className={classes.select}
          required={true}
          onChange={handleChange}
          value={state.search_loc}
          name="search_loc"
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          {regions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Fab type="submit" aria-label="search" color="primary" size="large">
          <SearchIcon />
        </Fab>
      </Box>
    </form>
  );
};
