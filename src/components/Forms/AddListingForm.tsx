import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import { ChangeFn, SubmitFn, MutationPayload } from "~/common/interface";
import { useMutation } from "@apollo/react-hooks";
import { INSERT_BUSINESS } from "~/services/graphql/mutations";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: "2em",
    },
    container: {},
    paper: {
      display: "flex",
      flexDirection: "column",
      padding: "1em",
    },
    textField: {
      marginBottom: "1em",
    },
  })
);

interface FormState {
  businessName: string;
  category: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  webURL: string;
}

const initialState: FormState = {
  businessName: "",
  category: "",
  street1: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  webURL: "",
};

export const AddListingForm = props => {
  const classes = useStyles(props);

  const [addBusiness, addBusinessData] = useMutation(INSERT_BUSINESS);

  const [state, setState] = React.useState<FormState>(initialState);

  const handleChange: ChangeFn = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const cpy = { ...state };
    cpy[event.target.name] = event.target.value;
    setState(cpy);
  };

  interface BusinessObject {
    name: string;
    category_id: number;
    location: PayloadData;
    contacts?: PayloadData;
  }

  const handleSubmit: SubmitFn = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    console.log(state);
    const details = gatherDetailsData(state);
    const location = gatherLocationData(state);
    const contacts = gatherContactsData(state);

    const payload = createEmptyPayload();
    const object: any = { ...details, location};
    
    if ( contacts !== null) {
      object.contacts = contacts;
    }
    
    payload.variables.objects.push(object);
    console.log("PAYLOAD ", payload);
    addBusiness(payload);
  };

  React.useEffect(() => {
    if (addBusinessData.loading) {
      console.log(addBusinessData);
    }
    if (addBusinessData.error) {
      console.log(addBusinessData);
    }
    if (addBusinessData.data) {
      console.log(addBusinessData);
    }
  }, [addBusinessData]);

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
        <Container maxWidth="sm"className={classes.container}>
      <Paper className={classes.paper}>
        <TextField
          onChange={handleChange}
          required={true}
          className={classes.textField}
          variant="outlined"
          label="Business Name"
          name="businessName"
        />
        <CategorySelect
          required={true}
          name="category"
          className={classes.textField}
          onChange={handleChange}
          value={state.category}
        />
        <TextField
          onChange={handleChange}
          required={true}
          className={classes.textField}
          variant="outlined"
          label="Street Address"
          name="street1"
        />
        <TextField
          onChange={handleChange}
          required={true}
          className={classes.textField}
          variant="outlined"
          label="City"
          name="city"
        />
        <TextField
          onChange={handleChange}
          required={true}
          className={classes.textField}
          variant="outlined"
          label="State"
          name="state"
        />
        <TextField
          onChange={handleChange}
          required={true}
          className={classes.textField}
          variant="outlined"
          label="Zip"
          name="zip"
        />
        <TextField
          onChange={handleChange}
          className={classes.textField}
          variant="outlined"
          label="Phone"
          name="phone"
        />
        <TextField
          onChange={handleChange}
          className={classes.textField}
          type="url"
          variant="outlined"
          label="Web Address"
          name="webURL"
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>

      </Paper>
        </Container>
    </form>
  );
};

function createEmptyPayload(): MutationPayload {
  return {
    variables: { objects: [] },
  };
}

function gatherDetailsData({ businessName, category }): object {
  return { name: businessName, category_id: category };
}

interface PayloadData {
  data: any;
}

interface LocationData {
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  zip: string;
}

interface ContactData {
  contact_type: string;
  contact_value: string;
}

function gatherLocationData({ street1, city, state, zip }): PayloadData {
  const data: PayloadData = { data: {} };
  const location: LocationData = {address_1: street1, city, state, zip};
  data.data = location;
  return data;
}

function gatherContactsData({ phone, webURL }): PayloadData | null {
  const data: PayloadData = { data: [] };
  if (phone) {
    const contactData: ContactData = { contact_type: "office", contact_value: phone }; 
    data.data.push(contactData);
  }

  if (webURL) {
    const contactData: ContactData = { contact_type: "website", contact_value: webURL };
    data.data.push(contactData);
  }

  if (data.data.length > 0) {
    return data;
  }

  return null;
}
