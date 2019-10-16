import React, { useReducer, useEffect } from "react";
import firebase from "~/services/firebase";
import { useMutation } from "@apollo/react-hooks";
import { ADD_EARLY_SIGNUP } from "~/services/graphql/mutations";
import { Message } from "semantic-ui-react";
import { BusinessForm } from "./BusinessForm";
import { SubscriberForm } from "./SubscriberForm";
import uuidv4 from "uuidv4";

import { reducer, actions, initialState } from "./reducer";

const storageRef = firebase.storage().ref();

export const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [addEarlySignup, mutationData] = useMutation(ADD_EARLY_SIGNUP);

  useEffect(() => {
    if (mutationData.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (mutationData.error) {
      setError(mutationData.error);
    }

    if (mutationData.data) {
      const { id } = mutationData.data.insert_early_signups.returning[0];
      console.log(
        `Early Signup graphql insertion successful. Data added under id ${id}`
      );
    }
  }, [mutationData]);

  const handleChange = event => {
    const copy = { ...state.form };
    copy[event.target.name] = event.target.value;
    dispatch(actions.updateField(copy));
  };

  const setLoading = loading => dispatch(actions.setLoading(loading));
  const clearForm = () => dispatch(actions.clearForm());
  const setError = error => {
    dispatch(actions.setError(error));
    dispatch(actions.setLoading(false));
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

      addEarlySignup({
        variables: {
          objects: [
            {
              business_name: state.form.businessName,
              email_address: state.form.email,
              city: state.form.city,
              state: state.form.state,
            },
          ],
        },
      });

      firebase
        .firestore()
        .collection("early_signups")
        .add({...state.form, logoUrl: state.logoUrl})
        .then(ref => {
          console.log(`Early Signup recorded with id ${ref.id}`);
          clearForm();
        })
        .catch(setError);
    }
  };

  const uploadFile = (file, metadata) => {
    dispatch( actions.setUploadState("uploading"));
    const filePath = `business_logos/${uuidv4()}.jpg`;
    // actions.setUploadTask(storageRef.child(filePath).put(file, metadata))
    let uploadTask = storageRef.child(filePath).put(file, metadata);

    uploadTask.on(
      "state_changed",
      snap => {
        const uploadPercent = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        dispatch(actions.setUploadPercent(uploadPercent));
      },
      err => {
        console.error(err);
        dispatch(actions.setUploadState("error "));
        dispatch(actions.setUploadTask(null));
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
          dispatch(actions.setUploadState("complete"));
          dispatch(actions.setLogoUrl(downloadUrl));
        });
      }
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    saveNewUser();
  };

  const Form = state.currentForm === "business" ? BusinessForm : SubscriberForm;

  const switchForm = formName => () =>
    dispatch(actions.setCurrentForm(formName));

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
          uploadFile={uploadFile}
          uploadState={state.uploadState}
          uploadPercent={state.uploadPercent}
          logoUrl={state.logoUrl}
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
