import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";


const USStates = [
  "CA",
  "NY",
  "TX",
  "PA"
]
//! This will be replaced with data from Hasura
const regions = USStates.map(abbr => ({value: abbr, label: abbr}))


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
      // marginBottom: "1rem",
    },
    input: {
      paddingLeft: theme.spacing(1),
      // flexGrow: 1,
      // maxWidth: "60%",
      // minWidth: "200px",
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

type SearchBarProps = {};

export const SearchBar: React.FunctionComponent = (props: any) => {
  const classes = useStyles(props);
  const router = useRouter();
  
  
  // set up some state for hold the search term and region
  const [term, setTerm] = useState<string | string[]>("");
  const [region, setRegion] = useState<string | string[]>("");
  console.log("states => " , term, region )
  
  useEffect(() => {
    const { term: queryTerm, region: queryRegion } = router.query; // Pull search options from the url
    if ( queryTerm !== undefined && queryTerm !== "" ) {
      console.log("TERM")
    }
    if ( queryRegion ) {
    }
    console.log("Term present >> ", queryRegion);
    console.log("Term present >> ", queryTerm);

  }, [])

  const handleChangeRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.target.value);
  };

  const handleChangeTerm = event => {
    setTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!region) {
      console.error("No state selected");
      return;
    }
    console.log("Search Term Submitted: ", term, region);
    router.push({ pathname: "/explore", query: { term, region }});
  };

  const inputProps = {
    className: classes.input,
    value: term,
    onChange: handleChangeTerm,
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        className={classes.searchField}
        variant="outlined"
        placeholder="What are you looking for?"
        inputProps={inputProps}
        onChange={handleChangeTerm}
        value={term}
      />
      <Box>
      <TextField
        select={true}
        placeholder="State"
        variant="outlined"
        className={classes.select}
        required={true}
        onChange={handleChangeRegion}
        value={region}
        SelectProps={{
          displayEmpty: true,
          renderValue: (value: string) => {
            if ( !value || !USStates.includes(value) ) {
              return "--"
            }
            return value
          },
          MenuProps: {
            className: classes.menu
          },

        }}
      >
        {regions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Fab
        type="submit"
        aria-label="search"
        color="primary"
        size="large"
      >
        <SearchIcon />
      </Fab>
      </Box>
    </form>
  );
};
