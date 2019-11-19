import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import MaskedInput from "react-text-mask";
import { ChangeFn, SubmitFn } from "../../../common/interface";

import { CategorySelect } from "../CategorySelect/CategorySelect";
import { INSERT_BUSINESS } from "~/services/graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

const downBreakpoint = "@media (max-width: 700px)";
const upBreakpoint = "@media (min-width: 700px)";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      minHeight: "50vh",
      display: "grid",
      // gridTemplateColumns: "repeat(auto-fit, minmax(575px, 1fr))",
      marginBottom: "2em",
    },
    paper: {
      display: "flex",
      padding: "2em",
      marginBottom: "2em",
      justifyContent: "stretch",
      alignContent: "stretch",
      [downBreakpoint]: {
        flexDirection: "column",
      },
    },
    sectionHeader: {},
    sectionContent: {
      display: "flex",
      justifyContent: "space-between",
      [downBreakpoint]: {
        flexDirection: "column",
      },
    },
    businessHoursSection: {
      display: "flex",
      flexDirection: "column",
    },
    contentItem: {
      [upBreakpoint]: {
        ["&:first-child"]: {
          marginRight: "1em",
        },
      },
    },
    section: {
      width: "100%",
      marginBottom: "1em",
      [upBreakpoint]: {
        ["&:not(:first-child)"]: {
          marginLeft: "1em",
        },
      },
    },
    textField: {
      width: "100%",
      marginBottom: "1em",
    },
    description: {
      width: "100%",
    },
    tableRow: {
      [downBreakpoint]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "stretch",
        alignContent: "stretch",
      },
    },
    tableCell: {
      [upBreakpoint]: {
        ["&:nth-child(even)"]: {
          marginRight: "1em",
        },
      },
      [downBreakpoint]: {
        width: "100%",
        marginBottom: "1em",
      },
    },
  })
);

interface State {
  loading: boolean;
  errors: null | object;
}

interface FormState {
  name: string;
  categoryID: string;
  phone: string;
  siteURL: string;
  priceFrom: string;
  priceTo: string;
  description: string;
  mondayOpen: string;
  mondayClose: string;
  tuesdayOpen: string;
  tuesdayClose: string;
  wednesdayOpen: string;
  wednesdayClose: string;
  thursdayOpen: string;
  thursdayClose: string;
  fridayOpen: string;
  fridayClose: string;
  saturdayOpen: string;
  saturdayClose: string;
  sundayOpen: string;
  sundayClose: string;
  instagramURL: string;
  facebookURL: string;
  twitterURL: string;
}

const initialState: FormState = {
  name: "",
  categoryID: "",
  phone: "",
  siteURL: "",
  priceFrom: "",
  priceTo: "",
  description: "",
  mondayOpen: "",
  mondayClose: "",
  tuesdayOpen: "",
  tuesdayClose: "",
  wednesdayOpen: "",
  wednesdayClose: "",
  thursdayOpen: "",
  thursdayClose: "",
  fridayOpen: "",
  fridayClose: "",
  saturdayOpen: "",
  saturdayClose: "",
  sundayOpen: "",
  sundayClose: "",
  instagramURL: "",
  facebookURL: "",
  twitterURL: "",
};

export const AddListingForm: React.FunctionComponent = (props: any) => {
  const classes = useStyles(props);
  const [state, setState] = React.useState<State>({
    loading: true,
    errors: null,
  });
  const [values, setValues] = React.useState<FormState>(initialState);
  const [addBusiness, addBusinessData] = useMutation(INSERT_BUSINESS);

  const handleChange: ChangeFn = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const cpy = { ...values };
    cpy[event.target.name] = event.target.value;
    setValues(cpy);
  };

  const submitListing = values => {
    // pull data from values and assemble payload
    // const contacts = createContactData(values);
    // const hours = createBusinessHoursData(values);
    // const location = createLocationData(values);
    // const details = createDetailsData(values);
    // const payload = { variables: { objects: [{
    //   { ...details, contacts, location, hours }
    // }]}};

    const payload = {
      variables: {
        objects: [
          {
            category_id: 10,
            description: "A test of our mutations",
            hours: {
              data: [
                { day: "Friday", closes: "21:00", opens: "09:00" },
                { day: "Saturday", closes: "21:00:00", opens: "09:00:00" },
                { day: "Sunday", closes: "21:00:00", opens: "09:00:00" },
                { day: "Monday", closes: "21:00:00", opens: "09:00:00" },
                { day: "Tuesday", closes: "21:00:00", opens: "09:00:00" },
                { day: "Wednesday", closes: "21:00:00", opens: "09:00:00" },
                { day: "Thursday", closes: "21:00:00", opens: "09:00:00" },
              ],
            },
            name: "New Biz",
            location: {
              data: {
                address_1: "543 Memory Lane",
                city: "Surprise",
                state: "AZ",
                zip: "57891",
              },
            },
            contacts: {
              data: [
                { contact_type: "office", contact_value: "505-444-3325" },
                {
                  contact_type: "instagram",
                  contact_value: "https://instagramstuff.com/things",
                },
              ],
            },
          },
        ],
      },
    };
    addBusiness(payload)
  };

  const handleSubmit: SubmitFn = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    submitListing(values);
    console.log(values);
  };

  React.useEffect(() => {
    if (addBusinessData.loading) {
      setState({ loading: true, errors: null });
    } else {
      setState({ loading: false, errors: null });
    }
  }, [addBusinessData]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <Typography>Listing Details</Typography>
          </div>
          <div className={classes.sectionContent}>
            <div className={classes.contentItem}>
              <TextField
                required={true}
                onChange={handleChange}
                className={classes.textField}
                label="Listing Name"
                id="listingName"
                name="name"
                variant="outlined"
              />
              <CategorySelect
                required={true}
                handleChange={handleChange}
                value={values.categoryID}
                className={classes.textField}
              />
              <TextField
                onChange={handleChange}
                className={classes.textField}
                name="phone"
                label="Phone Number"
                variant="outlined"
              />
            </div>
            <div className={classes.contentItem}>
              <TextField
                onChange={handleChange}
                className={classes.textField}
                name="siteURL"
                label="Website URL"
                variant="outlined"
                type="url"
              />

              <TextField
                onChange={handleChange}
                className={classes.textField}
                label="Price From"
                name="priceFrom"
                variant="outlined"
              />

              <TextField
                onChange={handleChange}
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
              onChange={handleChange}
              label="Description"
              id="description"
              name="description"
              className={classes.description}
              multiline={true}
              rows={8}
              variant="outlined"
            />
          </div>
        </div>
        <div className={classes.section}>
          <Table
            size="small"
            padding="none"
            style={{
              tableLayout: "fixed",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  {/* <Container className={classes.sectionHeader}> */}
                  <Typography>Business Hours</Typography>
                  {/* </Container> */}
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
                      shrink: true,
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
              required={true}
              onChange={handleChange}
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
                onChange={handleChange}
                label="Facebook"
                id="facebookURL"
                name="facebookURL"
                className={classes.textField}
                variant="outlined"
                type="url"
              />
              <TextField
                onChange={handleChange}
                label="Twitter"
                id="twitterURL"
                name="twitterURL"
                className={classes.textField}
                variant="outlined"
                type="url"
              />
              <TextField
                onChange={handleChange}
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
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

// interface TextMaskCustomProps {
//   inputRef: (ref: HTMLInputElement | null) => void;
// }

// function TextMaskCustom(props: TextMaskCustomProps) {
//   const { inputRef, ...other } = props;

//   return (
//     <MaskedInput
//       {...other}
//       ref={(ref: any) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={[
//         "(",
//         /[1-9]/,
//         /\d/,
//         /\d/,
//         ")",
//         " ",
//         /\d/,
//         /\d/,
//         /\d/,
//         "-",
//         /\d/,
//         /\d/,
//         /\d/,
//         /\d/,
//       ]}
//       placeholderChar={"\u2000"}
//       showMask={true}
//     />
//   );
// }
