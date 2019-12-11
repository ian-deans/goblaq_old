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

// import MaskedInput from "react-text-mask";
import { ChangeFn, SubmitFn } from "../../../../common/interface"; //TODO: add path alias, fuck this relative shit

import { CategorySelect } from "~/components/businesses/categories/CategorySelect";
import { UPDATE_BUSINESS } from "~/services/graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { LinearProgress } from "@material-ui/core";

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
  const [addBusiness, addBusinessData] = useMutation(UPDATE_BUSINESS);

  const handleChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const cpy = { ...values };
    cpy[event.target.name] = event.target.value;
    setValues(cpy);
  };

  const submitListing = values => {
    // pull data from values and assemble payload
    const contacts = createContactData(values);
    const hours = createHoursData(values);
    const location = createLocationData(values);
    const details = createDetailsData(values);
    const payload = {
      variables: { objects: [{ ...details, contacts, location, hours }] },
    };

    addBusiness(payload);
  };

  const handleSubmit: React.FormEventHandler = (
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
    return <LinearProgress />;
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
                onChange={handleChange}
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
            <div>
              <TextField
                required={true}
                onChange={handleChange}
                label="Address"
                id="location"
                name="address_1"
                className={classes.textField}
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                // label="Location"
                id="location"
                name="address_2"
                className={classes.textField}
                variant="outlined"
              />
              <TextField
                required={true}
                onChange={handleChange}
                label="City"
                id="location"
                name="city"
                className={classes.textField}
                variant="outlined"
              />
              <TextField
                required={true}
                onChange={handleChange}
                label="State"
                id="location"
                name="state"
                className={classes.textField}
                variant="outlined"
              />
              <TextField
                required={true}
                onChange={handleChange}
                label="Zip"
                id="location"
                name="zip"
                className={classes.textField}
                variant="outlined"
              />
            </div>
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

const createDetailsData = ({ name, categoryID, description }) => ({
  name,
  category_id: categoryID,
  description,
});

const createHoursData = ({
  mondayOpen,
  mondayClose,
  tuesdayOpen,
  tuesdayClose,
  wednesdayOpen,
  wednesdayClose,
  thursdayOpen,
  thursdayClose,
  fridayOpen,
  fridayClose,
  saturdayOpen,
  saturdayClose,
  sundayOpen,
  sundayClose,
}) => ({
  data: [
    { day: "Monday", opens: mondayOpen, closes: mondayClose },
    { day: "Tuesday", opens: tuesdayOpen, closes: tuesdayClose },
    { day: "Wednesday", opens: wednesdayOpen, closes: wednesdayClose },
    { day: "Thursday", opens: thursdayOpen, closes: thursdayClose },
    { day: "Friday", opens: fridayOpen, closes: fridayClose },
    { day: "Saturday", opens: saturdayOpen, closes: saturdayClose },
    { day: "Sunday", opens: sundayOpen, closes: sundayClose },
  ],
});

const createLocationData = ({ address_1, address_2, city, state, zip }) => ({
  data: {
    address_1,
    address_2,
    city,
    state,
    zip,
  },
});

const createContactData = ({
  phone,
  instagramURL,
  facebookURL,
  twitterURL,
  siteURL,
}) => ({
  data: [
    { contact_type: "office", contact_value: phone },
    { contact_type: "twitter", contact_value: twitterURL },
    { contact_type: "facebook", contact_value: facebookURL },
    { contact_type: "instagram", contact_value: instagramURL },
    { contact_type: "website", contact_value: siteURL },
  ],
});

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
