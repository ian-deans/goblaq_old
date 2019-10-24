import React, { useReducer, useEffect, useState } from "react";
import firebase from "~/services/firebase";
import mime from "mime-types";
import uuidv4 from "uuidv4";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_EARLY_SIGNUP } from "~/services/graphql/mutations";
import { GET_BUSINESS_CATEGORIES } from "~/services/graphql/queries";
import { Message } from "semantic-ui-react";
import { BusinessForm } from "./BusinessForm";
import { SubscriberForm } from "./SubscriberForm";
import { reducer, actions, initialState } from "./reducer";

const storageRef = firebase.storage.ref();
const logo_storage_path = "business_logos_dev";

const authorizedFileTypes = ["image/jpeg", "image/png", "image/gif"];

const isAuthorized = fileName =>
  authorizedFileTypes.includes(mime.lookup(fileName));

export const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [addEarlySignup, addEarlySignupData] = useMutation(ADD_EARLY_SIGNUP);
  const { loading, error, data } = useQuery(GET_BUSINESS_CATEGORIES);
  const [file, setFile] = useState(null);

  const onBusinessForm = () => state.currentForm === "business";

  //* Effect Functions
  const handleGetCategories = () => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (error) {
      setError(error);
    } else {
      setError({});
    }

    if (data) {
      setCategories(data.business_categories);
    }
  };

  const handleEarlySignup = mutationData => () => {
    if (mutationData.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (mutationData.error) {
      setError({
        message: "That email address is already in use.",
        detail: mutationData.error,
      });
    }

    if (mutationData.data) {
      const { id } = mutationData.data.insert_early_signups.returning[0];
      console.log(
        `Early Signup graphql insertion successful. Data added under id ${id}`
      );

      addFirestoreEntry();
    }
  };

  //* Effect Hooks
  useEffect(handleGetCategories, [loading, error, data]);
  useEffect(handleEarlySignup(addEarlySignupData), [addEarlySignupData]);

  //* Dispatch Functions
  const clearForm = () => dispatch(actions.clearForm());

  const setCategories = categories =>
    dispatch(actions.setBusinessCategories(categories));

  const setError = error => {
    dispatch(actions.setError(error));
    dispatch(actions.setLoading(false));
  };

  const setLoading = loading => dispatch(actions.setLoading(loading));

  const updateForm = change => {
    const copy = { ...state.form, ...change };
    dispatch(actions.updateField(copy));
  };

  const completeSignup = () => dispatch(actions.formSubmitted());

  //* Form Input Change Handler
  const handleChange = (event, data) => {
    const change = {};
    if (data) {
      change[data.name] = data.value;
    } else {
      change[event.target.name] = event.target.value;
    }
    updateForm(change);
  };

  //* form validation function
  const formIsValid = () => {
    let error;
    if (formIsEmpty(state.form)) {
      error = { message: "Please fill in all fields." };
      setError(error);
      return false;
    }

    if (onBusinessForm()) {
      if ( state.form.businessCategory === undefined ) {
        error = {message: "A category is required for businesses."};
        setError(error);
        return false;
      }
      
      if (file === null) {
        error = {
          message:
            "A logo is required for businesses.",
        };
        setError(error);
        return false;
      }
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

  //* overarching function that handles registering an early signup
  const saveEarlySignup = () => {

    // call the graphql mutation first, success/failure is recorded in firestore
    addEarlySignup({
      variables: {
        objects: [
          {
            business_name: state.form.businessName,
            email_address: state.form.email,
            city: state.form.city,
            state: state.form.state,
            business_category_id: state.form.businessCategory,
            logo_url: state.form.logoUrl,
          },
        ],
      },
    });

    // const mailchimp_api_key = "4150de0906b2e01661030d8a294f7f62-us12";
    // const dc = mailchimp_api_key.split("-")[1];
    // const mailchimp_authstring = window.btoa(`anystring:${mailchimp_api_key}`);
    // const mailchimp_business_list_id = "540b068fae";
    // const mailchimp_subscriber_list_id = "e5420d6327";
    // const mailchimp_base_url = listId =>
    //   `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;

  };

  const addFirestoreEntry = () => {
    firebase.firestore
      .collection("early_signups")
      .add({ ...state.form })
      .then(ref => {
        console.log(`Early Signup recorded with id ${ref.id}`);
        // clearForm();
        completeSignup();
      })
      .catch(setError);
  }

  //* function uploads an image file and stores the returned url in state via updateForm()
  const uploadFile = (file, metadata) => {
    dispatch(actions.setUploadState("uploading"));
    const filePath = `${logo_storage_path}/${uuidv4()}.jpg`;
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
        // dispatch(actions.setUploadTask(null));
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
          dispatch(actions.setUploadState("complete"));
          updateForm({ logoUrl: downloadUrl });
          saveEarlySignup();
        });
      }
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (formIsValid() && !state.formSubmitted) {
      setError({});
      if (onBusinessForm() && state.form.logoUrl === undefined ) {
        if (isAuthorized(file.name)) {
          const metadata = { contentType: mime.lookup(file.name) };
          uploadFile(file, metadata);
        } else {
          setError({
            message: "File type not recognized. Only .jpg, .gif, .png allowed.",
          });
        }
      } else {
        saveEarlySignup();
      }
    }
  };

  const Form = onBusinessForm() ? BusinessForm : SubscriberForm;

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

  const formProps = {
    data: state,
    handleChangeFn: handleChange,
    handleSubmitFn: handleSubmit,
    setFileFn: setFile,
    loading: addEarlySignupData.loading,
    uploadFile: uploadFile,
    uploadState: state.uploadState,
    uploadPercent: state.uploadPercent,
    logoUrl: state.form.logoUrl,
    businessCategories: formatCategoryData(state.businessCategories),
  };

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
        <Form {...formProps} />
        {state.formSubmitted && (
          <div className="success-message">

          <Message positive compact size="large">
            <p>Thank you for signing up for Goblaq! Please check your email for a message from us.</p>
          </Message>
          </div>
        )}
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

        .errors, .success-message {
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

function formatCategoryData(dataArray) {
  // const sortedKeys = Object.keys(dataArray ).sort();
  return dataArray.map(({ id, text }) => ({ key: id, value: id, text }));
}
