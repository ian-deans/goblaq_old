import React, { useReducer, useEffect, useState } from "react";
import firebase from "~/services/firebase";
import mime from "mime-types";
import uuidv4 from "uuidv4";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_EARLY_SIGNUP } from "~/services/graphql/mutations";
import { GET_BUSINESS_CATEGORIES } from "~/services/graphql/queries";
// import { Message } from "semantic-ui-react";
import { BusinessForm } from "./BusinessForm";
import { SubscriberForm } from "./SubscriberForm";
import { reducer, actions, initialState } from "./reducer";
import errorLogger from "~/services/ErrorLogger";



const CONFIG = {
  firestoreCollection: "early_signups",
  logoStoragePath: "business_logos",
  authorizedFileTypes: ["image/jpeg", "image/png", "image/gif"],
};

const recaptchaRef = React.createRef();
const storageRef = firebase.storage.ref();

const isAuthorized = fileName => true;
  // CONFIG.authorizedFileTypes.includes(mime.lookup(fileName));


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

      console.log(mutationData.data);

      //* after successful insertion into the database, store the returned id and the rest
      //* of the form data in Firestore.
      addFirestoreEntry(id);
    }
  };

  //* Effect Hooks
  useEffect(handleGetCategories, [loading, error, data]);
  useEffect(handleEarlySignup(addEarlySignupData), [addEarlySignupData]);

  useEffect(() => {
    // fires off function intiating chain of events pertainging to saving an early
    // sign up. initiating save based on state allows time for any necessary state
    // updates to take place.
    if (state.readyToSubmit === true) {
      saveEarlySignup();
    }
  }, [state.readyToSubmit]);

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
    if ( !event.target && typeof event === "string") {
      // the event is the ReCaptcha value
      updateForm({recaptchaString: event})
    }
    if (event.target.name === "zip") {
      if ( state.form.zip && state.form.zip.length >= 5) {
        return
      }
      if ( !stringContainsOnlyNumbers(event.target.value) ) {
        return
      }
    }

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
    const { form } = state;
    let error;

    if ( form.recaptchaString.length < 1 ) {
      error = { message: "Please verify you are not a robot." };
      setError(error);
      return false;
    }

    if (formIsEmpty(form)) {
      error = { message: "Please fill in all fields." };
      setError(error);
      return false;
    }

    if (onBusinessForm()) {
      if (noBusinessCategory(form)) {
        error = { message: "A category is required for businesses." };
        setError(error);
        return false;
      }

      if (noBusinessName(form)) {
        error = { message: "Please provide the name of your business." };
      }

      if (file === null) {
        error = {
          message: "A logo is required for businesses.",
        };
        setError(error);
        return false;
      }

      if (!form.address) {
        error = {
          message: "A street address is required for businesses."
        };
        setError(error);
        return false;
      }
    }

    if (addressFieldsAreEmpty(form)) {
      error = { message: "Address fields are required." };
      setError(error);
      return false;
    }
    return true;
  };


  const noBusinessCategory = ({ businessCategory }) => !businessCategory
  const noBusinessName = ({ businessName }) => !businessName;
  const formIsEmpty = ({ name, email }) => {
    return !name || !email;
  };
  const addressFieldsAreEmpty = ({ address, city, state, zip }) => {
    return !city || !state || !zip;
  };

  //* overarching function that handles registering an early signup
  const saveEarlySignup = () => {
    // call the graphql mutation first, success/failure is recorded in firestore
    addEarlySignup({
      variables: {
        objects: [
          {
            business_name: state.form.businessName || null,
            business_category_id: state.form.businessCategory || null,
            email_address: state.form.email,
            name: state.form.name,
            address: state.form.address || null,
            city: state.form.city,
            state: state.form.state,
            zip: state.form.zip,
            logo_url: state.form.logoUrl || null,
          },
        ],
      },
    });
  };

  //* insert data into firestore, form state and id returned from hasura stored.
  const addFirestoreEntry = id => {
    firebase.firestore
      .collection(CONFIG.firestoreCollection)
      .add({ ...state.form, hasuraId: id })
      .then(ref => {
        console.log(`Early Signup recorded with id ${ref.id}`);
        completeSignup();
      })
      .catch(error => {
        setError(error);
        errorLogger.log(error);
      });
  };

  //* function uploads an image file and stores the returned url in state via updateForm()
  const uploadFile = (file, metadata) => {
    dispatch(actions.setUploadState("uploading"));
    const filePath = `${CONFIG.logoStoragePath}/${uuidv4()}.jpg`;
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
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
          console.log("TASK DONE ", downloadUrl);
          updateForm({ logoUrl: downloadUrl });
          dispatch(actions.setUploadState("complete"));
          dispatch(actions.readyToSubmit());
        });
      }
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    //* validate form and make sure it hasnt already been submitted
    if (formIsValid() && !state.formSubmitted) {
      setError({});

      if (onBusinessForm() && state.form.logoUrl === "") {
        if (isAuthorized(file.name)) {
          const metadata = { contentType: mime.lookup(file.name) };
          uploadFile(file, metadata);
        } else {
          setError({
            message: "File type not recognized. Only .jpg, .gif, .png allowed.",
          });
        }
      } else {
        dispatch(actions.readyToSubmit());
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
    data: state.form,
    handleChangeFn: handleChange,
    handleSubmitFn: handleSubmit,
    setFileFn: setFile,
    loading: addEarlySignupData.loading,
    uploadFile: uploadFile,
    uploadState: state.uploadState,
    uploadPercent: state.uploadPercent,
    logoUrl: state.form.logoUrl,
    businessCategories: formatCategoryData(state.businessCategories),
    recaptchaRef,
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
        {/* <Form {...formProps} /> */}
        {state.formSubmitted && (
          <div className="success-message">
            {/* <Message positive compact size="large">
              <p>
                Thank you for signing up for Goblaq! Please check your email for
                a message from us.
              </p>
            </Message> */}
          </div>
        )}
        {state.error.message && (
          <div className="errors">
            {/* <Message negative compact size="large">
              <p>{state.error.message}</p>
            </Message> */}
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

        .errors,
        .success-message {
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
  return dataArray.map(({ id, text }) => ({ key: id, value: id, text }));
}

function stringContainsOnlyNumbers(str){
  return /^\d+$/.test(str);
}
