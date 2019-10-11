import React, { useReducer, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import firebase from "~/services/firebase";

import { Message } from "semantic-ui-react";
import { BusinessForm } from "./BusinessForm";
import { SubscriberForm } from "./SubscriberForm";


const initialState = {
  isLoading: false,
  currentForm: "business",
  form: {},
  error: {},
  success: {},
  loading: false
};

const ADD_EARLY_SIGNUP = gql`
  mutation insert_early_signups($objects: [early_signups_insert_input!]!) {
    insert_early_signups(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "set_current_form":
      return {
        ...state,
        form: {},
        error: {},
        currentForm: action.payload
      };

    case "update_field": {
      return {
        ...state,
        form: { ...action.payload.form }
      };
    }

    case "clear_form": {
      return {
        ...state,
        form: {}
      };
    }

    case "set_error": {
      return {
        ...state,
        error: action.payload.error
      };
    }

    case "set_loading": {
      return {
        ...state,
        loading: action.payload.loading
      };
    }
  }
};

export const Signup = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [ addEarlySignup, mutationData ] = useMutation( ADD_EARLY_SIGNUP );

  useEffect(() => {
    console.log("mutationData changed: ", mutationData)
    
    if ( mutationData.loading ) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if ( mutationData.error ) {
      setError( mutationData.error );
    }

    if ( mutationData.data ) {
      const { id } = mutationData.data.insert_early_signups.returning[0];
      console.log(`Early Signup graphql insertion successful. Data added under id ${id}`);
    }

  },[mutationData]);

  const handleChange = event => {
    const copy = { ...state.form };
    copy[event.target.name] = event.target.value;
    dispatch({ type: "update_field", payload: { form: copy } });
  };

  const setLoading = loading =>
    dispatch({ type: "set_loading", payload: { loading } });

  const clearForm = () => dispatch({ type: "clear_form" });

  const setError = error => {
    dispatch({ type: "set_error", payload: { error } });
    setLoading(false);
  };

  const formIsValid = () => {
    let error;
    if (formIsEmpty(state.form)) {
      error = { message: "Fill in all fields." };
      setError(error);
      return false;
    }

    if (addressFieldsAreEmpty(state.form)) {
      error = { message: "Address fields are required." };
      setError(error);
      return false;
    }
    return true;
  };

  const formIsEmpty = ({ businessName, name, email }) => {
    return (!name && !businessName) || !email;
  };

  const addressFieldsAreEmpty = ({ city, state, zip }) => {
    return !city || !state || !zip;
  };

  const saveNewUser = () => {
    if (formIsValid()) {
      setError({});

      addEarlySignup({variables: {
        objects: [
          {
            business_name: state.form.businessName,
            email_address: state.form.email,
            city: state.form.city,
            state: state.form.state,
          }
        ]
      }});

      firebase
        .firestore()
        .collection("early_signups")
        .add(state.form)
        .then(ref => {
          console.log(`Early Signup recorded with id ${ref.id}`);
          clearForm();
          // setLoading(false);
        })
        .catch(setError);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    saveNewUser();
  };

  const Form = state.currentForm === "business" ? BusinessForm : SubscriberForm;

  const switchForm = formName => () =>
    dispatch({ type: "set_current_form", payload: formName });

  const viewBusinessForm = switchForm("business");

  const viewSubsciberForm = switchForm("subscriber");

  const busClasses = ["toggle-btn"];
  const subClasses = [...busClasses];
  if (state.currentForm === "business") {
    busClasses.push("active");
  } else {
    subClasses.push("active");
  }

  return (
    <div className="signup">
      <div className="top-row">
        <span onClick={viewBusinessForm} className={busClasses.join(" ")}>
          Business
        </span>
        <span onClick={viewSubsciberForm} className={subClasses.join(" ")}>
          Subscriber
        </span>
      </div>
      <div className="form-container">
        <Form
          data={state}
          handleChangeFn={handleChange}
          handleSubmitFn={handleSubmit}
          loading={mutationData.loading}
        />
        {state.error.message && (
          <div className="errors">
            <Message negative compact size="large">
              <p>{state.error.message}</p>
            </Message>
          </div>
        )}
      </div>
      <style jsx>{`
        .top-row {
          display: flex;
          justify-content: space-around;
          border-bottom: solid black 2px;
          margin-bottom: 1em;
        }

        .toggle-btn {
          font-size: 1.5em;
          font-weight: 900;
          margin: 1em;
        }

        .toggle-btn:hover {
          cursor: pointer;
        }

        .errors {
          margin-top: 2em;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .active {
          color: red;
        }
      `}</style>
    </div>
  );
};
