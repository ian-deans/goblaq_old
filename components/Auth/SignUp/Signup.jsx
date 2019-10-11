import React, { useReducer, useState } from "react";
import { Message } from "semantic-ui-react";
import { BusinessForm } from "./BusinessForm";
import { SubscriberForm } from "./SubscriberForm";
import firebase from "~/services/firebase";

const initialState = {
  isLoading: false,
  currentForm: "business",
  form: {},
  error: {},
  success: {},
  loading: false
};

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
    console.log(state);
    if (formIsEmpty(state.form)) {
      error = { message: "Fill in all fields." };
      setError(error);
      return false;
    }

    // console.log( passwordIsInvalid( state.form ))
    // if ( passwordIsInvalid( state.form ) ) {
    //   error = { message: "Password is invalid" };
    //   setError( error );
    //   return false;
    // }

    if (addressFieldsAreEmpty(state.form)) {
      error = { message: "Address fields are required." };
      setError(error);
      return false;
    }
    return true;
  };

  const formIsEmpty = ({ name, email }) => {
    return !name || !email;
  };

  // const passwordIsInvalid = ( { password, password_confirm } ) => {
  //   console.log(password.length < 6, password_confirm.length < 6)
  //   if ( password.length < 6 || password_confirm.length < 6 ) {
  //     return true;
  //   }
  //   // if ( password !== password_confirm ) {
  //   //   return false;
  //   // }
  //   return false;
  // };

  const addressFieldsAreEmpty = ({ address, city, state, zip }) => {
    return !city || !state || !zip;
  };

  const updateUser = async createdUser => {
    await createdUser.user.updateProfile({
      displayName: state.form.name,
      address: state.form.address,
      city: state.form.city,
      state: state.form.state,
      zip: state.form.zip,
      type: state.currentForm
    });

    return firebase
      .firestore()
      .collection("users")
      .doc(createdUser.user.uid)
      .set(createdUser.user);
  };

  const saveNewUser = () => {
    if (formIsValid()) {
      setError({});
      setLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(state.form.email, state.form.password)
        .then(updateUser)
        .then(() => clearForm())
        .then(() => setLoading(false))
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
          loading={state.loading}
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
