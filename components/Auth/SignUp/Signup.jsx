import React, { useReducer, useState } from "react";
import { BusinessForm } from "./BusinessForm";
import { SubscriberForm } from "./SubscriberForm";
import firebase from "~/services/firebase";

const initialState = {
  isLoading: false,
  currentForm: "business",
  form: {},
  error: {},
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case "set_current_form":
      return {
        ...state,
        form: {},
        error: {},
        currentForm: action.payload,
      };

    case "update_field": {
      return {
        ...state,
        form: { ...action.payload.form },
      }
    }

    case "clear_form": {
      return {
        ...state,
        form: {},
      }
    }

    case "set_error": {
      return {
        ...state,
        error: action.payload.error,
      }
    }
  }
}

export const Signup = props => {
  const [ state, dispatch ] = useReducer( reducer, initialState );
  const handleChange = event => {
    console.log( event )
    const copy = { ...state.form };
    copy[ event.target.name ] = event.target.value;
    dispatch( { type: "update_field", payload: { form: copy } } );
  }
  const clearForm = () => dispatch( { type: "clear_form" } );

  const setError = error => {
    dispatch( { type: "set_error", payload: { error } } )
  }

  const updateUser = ( createdUser ) =>
    createdUser.user.updateProfile( {
      displayName: state.form.name,
      address: state.form.address,
      city: state.form.city,
      state: state.form.state,
      zip: state.form.zip,
    } );

  const saveNewUser = () => {
    // validate form
    firebase
      .auth()
      .createUserWithEmailAndPassword( state.form.email, state.form.password )
      .then( updateUser )
      .then( () => console.log( "User Saved" ) )
      .catch( setError )
  };

  const handleSubmit = event => {
    event.preventDefault();
    saveNewUser();
  }

  const Form = state.currentForm === "business" ? BusinessForm : SubscriberForm;
  const switchForm = formName => dispatch( { type: "set_current_form", payload: formName } );
  const viewBusinessForm = () => switchForm( "business" );
  const viewSubsciberForm = () => switchForm( "subscriber" );

  const busClasses = [ "toggle-btn" ];
  const subClasses = [ ...busClasses ];
  if ( state.currentForm === "business" ) {
    busClasses.push( "active" );
  } else {
    subClasses.push( "active" );
  }
  console.log( state.error )
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center">
        <h4 onClick={ viewBusinessForm } className={ busClasses.join( " " ) }>Business</h4>
        <h4 onClick={ viewSubsciberForm } className={ subClasses.join( " " ) }>Subscriber</h4>
      </div>
      <div className="form-container">
        <Form data={ state } handleChangeFn={ handleChange } handleSubmitFn={ handleSubmit } />
        { state.error && ( <p>{state.error.message}</p> ) }
      </div>
      <style jsx>{ `
        .form-container {
          // border-top: solid black 2px;
        }

        .toggle-btn {
          margin-right: 1em;
        }

        .active {
          color: red;
        }
      `}</style>
    </div>
  )
}