import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // minHeight: "100vh",
    },
    form: {
      minHeight: "50vh",
      display: "grid",
    },
    paper: {
      display: "flex",
      // flexDirection: "column",
      padding: "2em",
      marginBottom: "2em",
    },
    textField: {
      margin: "1em",
    },
    description: {
      // width: "50%",
      margin: "1em",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      justifyContent: "center",
      justifyItems: "stretch"
    },
    sectionHeader: {
      // width: "25%"
    },
  })
);

export default (props: any) => {
  const classes = useStyles(props);
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h2">Add Listing</Typography>
      <form className={classes.form}>
        <Paper className={classes.paper}>
          <Container className={classes.container}>
            <Typography>Listing Details</Typography>
            {/* <FormControl> */}
            <TextField
              className={classes.textField}
              label="Business Name"
              id="businessName"
              name="name"
              variant="outlined"
            />
            {/* </FormControl> */}

            {/* <FormControl> */}
            <TextField
              className={classes.textField}
              name="category"
              label="Category"
              variant="outlined"
            />
            {/* </FormControl> */}

            {/* <FormControl> */}
            <TextField
              className={classes.textField}
              name="phone"
              label="Phone Number"
              variant="outlined"
            />
            {/* </FormControl> */}
          </Container>

          <Container className={classes.container}>
            {/* <FormControl> */}
            <TextField
              className={classes.textField}
              name="siteURL"
              label="Website URL"
              variant="outlined"
            />
            {/* </FormControl> */}

            {/* <FormControl> */}
            <TextField
              className={classes.textField}
              label="Price From"
              name="priceFrom"
              variant="outlined"
            />
            {/* </FormControl> */}

            {/* <FormControl> */}
            <TextField
              className={classes.textField}
              name="priceTo"
              label="Price To"
              variant="outlined"
            />
            {/* </FormControl> */}
          </Container>
        </Paper>

        <Paper className={classes.paper}>
          {/* <FormControl> */}
          <Container className={classes.container}>
            <Typography>Description</Typography>
            <TextField
              label="Description"
              id="description"
              name="description"
              className={classes.description}
              multiline={true}
              rows={4}
              variant="outlined"
              />
          </Container>
          <Container className={classes.container}>
              <Typography>Business Hours</Typography>

          </Container>
          {/* </FormControl> */}
        </Paper>
        <Paper className={classes.paper}>
          <Container className={classes.container}>
          <Typography>Location</Typography>
            <TextField
              label="Location"
              id="location"
              name="location"
              className={classes.textField}
              variant="outlined"
            />
          </Container>
          <Container>
            <Typography>Social Networking</Typography>
            <TextField
              label="Location"
              id="location"
              name="location"
              className={classes.textField}
              variant="outlined"
            />
            <TextField
              label="Location"
              id="location"
              name="location"
              className={classes.textField}
              variant="outlined"
            />
            <TextField
              label="Location"
              id="location"
              name="location"
              className={classes.textField}
              variant="outlined"
            />
          </Container>
        </Paper>
      </form>
    </Container>
  );
};

{
  /* <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
          id="component-helper"
          value={name}
          onChange={handleChange}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
      </FormControl> */
}
