import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import MaskedInput from "react-text-mask";

const downBreakpoint = "@media (max-width: 425px)";
const upBreakpoint = "@media (min-width: 425px)";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: "border-box"
    },
    form: {
      minHeight: "50vh",
      display: "grid"
    },
    paper: {
      display: "flex",
      padding: "2em",
      marginBottom: "2em",
      justifyContent: "stretch",
      alignContent: "stretch",
      [downBreakpoint]: {
        flexDirection: "column"
      }
    },
    sectionHeader: {},
    sectionContent: {
      display: "flex",
      justifyContent: "space-between",
      // flexWrap: "wrap",
      [downBreakpoint]: {
        flexDirection: "column"
      }
    },
    businessHoursSection: {
      display: "flex",
      flexDirection: "column"
    },
    contentItem: {
      [upBreakpoint]: {
        ["&:first-child"]: {
          marginRight: "1em"
        }
      }
    },
    section: {
      width: "100%",
      [upBreakpoint]: {
        ["&:not(:first-child)"]: {
          marginLeft: "1em"
        }
      }
    },
    textField: {
      width: "100%",
      // maxWidth: "500px",
      marginBottom: "1em"
    },
    description: {
      width: "100%"
    },
    tableWrapper: {
      // width: "auto",
      // overflowX: "auto",
    },
    tableRow: {
      [downBreakpoint]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "stretch",
        alignContent: "stretch"
      }
    },
    tableCell: {
      // verticalAlign: "middle",
      [upBreakpoint]: {
        ["&:nth-child(even)"]: {
          marginRight: "1em"
        }
      },
      [downBreakpoint]: {
        width: "100%",
        marginBottom: "1em"
      }
    }
  })
);


interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-",  /\d/, /\d/, /\d/, /\d/ ]}
      placeholderChar={'\u2000'}
      showMask={true}
    />
  )
}

interface State {
  textmask: string;
}

export default (props: any) => {
  const classes = useStyles(props);
  const [values, setValues] = React.useState<State>({
    textmask: "(   )   -    ",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event)
    console.log(event.target.name);
    console.log(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Typography style={{ marginBottom: "1em" }} variant="h2">
        Add Listing
      </Typography>

      <form className={classes.form}>
        <Paper className={classes.paper}>
          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              <Typography>Listing Details</Typography>
            </div>
            <div className={classes.sectionContent}>
              <div className={classes.contentItem}>
                <TextField
                  className={classes.textField}
                  label="Listing Name"
                  id="listingName"
                  name="name"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  name="category"
                  label="Category"
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                />
              </div>
              <div className={classes.contentItem}>
                <TextField
                  className={classes.textField}
                  name="siteURL"
                  label="Website URL"
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  label="Price From"
                  name="priceFrom"
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  name="priceTo"
                  label="Price To"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </Paper>

        <Paper className={classes.paper}>
          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              <Typography>Description</Typography>
            </div>
            <div className={classes.sectionContent}>
              <TextField
                label="Description"
                id="description"
                name="description"
                className={classes.description}
                multiline={true}
                rows={4}
                variant="outlined"
              />
            </div>
          </div>
          <div className={classes.section}>
            {/* <div className={classes.tableWrapper}> */}
              <Table
                size="small"
                padding="none"
                style={{
                  tableLayout: "fixed"
                }}
              >
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      <Container className={classes.sectionHeader}>
                        <Typography>Business Hours</Typography>
                      </Container>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      <Typography variant="subtitle2" component="span">
                        Monday
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Open"
                        name="mondayOpen"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Close"
                        name="mondayClose"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      <Typography variant="subtitle2" component="span">
                        Tuesday
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Open"
                        name="tuesdayOpen"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Close"
                        name="tuesdayClose"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      <Typography variant="subtitle2" component="span">
                        Wednesday
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Open"
                        name="wednesdayOpen"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Close"
                        name="wednesdayClose"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      <Typography variant="subtitle2" component="span">
                        Thursday
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Open"
                        name="thursdayOpen"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Close"
                        name="thursdayClose"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      <Typography variant="subtitle2" component="span">
                        Friday
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Open"
                        name="fridayOpen"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Close"
                        name="fridayClose"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      <Typography variant="subtitle2" component="span">
                        Saturday
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Open"
                        name="saturdayOpen"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Close"
                        name="saturdayClose"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.tableCell}>
                      <Typography variant="subtitle2" component="span">
                        Sunday
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Open"
                        name="sundayOpen"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <TextField
                        className={classes.textField}
                        label="Close"
                        name="sundayClose"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            {/* </div> */}
          </div>
        </Paper>

        <Paper className={classes.paper}>
          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              <Typography>Location</Typography>
            </div>

            <div className={classes.sectionContent}>
              <TextField
                label="Location"
                id="location"
                name="location"
                className={classes.textField}
                variant="outlined"
              />
            </div>
          </div>
          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              <Typography>Social Networking</Typography>
            </div>
            <div className={classes.sectionContent}>
              <div>
                <TextField
                  label="Facebook"
                  id="facebookURL"
                  name="facebookURL"
                  className={classes.textField}
                  variant="outlined"
                  type="url"
                />
                <TextField
                  label="Twitter"
                  id="twitterURL"
                  name="twitterURL"
                  className={classes.textField}
                  variant="outlined"
                  type="url"
                />
                <TextField
                  label="Instagram"
                  id="instagramURL"
                  name="instagramURL"
                  className={classes.textField}
                  variant="outlined"
                  type="url"
                />
              </div>
            </div>
          </div>
        </Paper>
      </form>
    </div>
  );
};
