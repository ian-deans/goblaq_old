import React from "react";

// interface formProps {
//   data?: any;
//   handleChangeFn: any;
//   handleSubmitFn: any;
// }

export const SubscriberForm = ( { data, handleChangeFn, handleSubmitFn } ) => {

  return (
    <React.Fragment>
      <form className="form" onSubmit={ handleSubmitFn }>
        <div className="form-group">
          <label>Name</label>
          <input onChange={ handleChangeFn }
            id="businessNameInput"
            className="form-control"
            value={ data.name }
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input onChange={ handleChangeFn } id="cityInput" className="form-control" value={ data.email } name="email" placeholder="Your email Address" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input onChange={ handleChangeFn } id="passwordInput" type="password" value={ data.password } name="password" className="form-control" />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input onChange={ handleChangeFn } id="passwordConfirmInput" type="password"
            value={ data.password_confirm } name="password_confirm" placeholder="Confirm your password" className="form-control" />
        </div>

        <div className="form-row">
          <div className="form-group col-md-8">
            <label>City</label>
            <input onChange={ handleChangeFn } id="cityInput" className="form-control" value={ data.city } name="city" placeholder="City" />
          </div>
          <div className="form-group col-md-2">
            <label>State</label>
            <input onChange={ handleChangeFn } id="stateInput" className="form-control" value={ data.state } name="state" placeholder="State" />
          </div>
          <div className="form-group col-md-2">
            <label>Zip</label>
            <input onChange={ handleChangeFn } id="zipInput" className="form-control" value={ data.zip } name="zip" placeholder="Zip" />
          </div>
        </div>
        <div className="form-group">
          <div className="g-recaptcha" data-sitekey="6LfQM7sUAAAAAG-CxCHZ7sfpR284B-rrd89dGS76"></div>
        </div>
        <div className="form-group">
          <button className="btn btn-dark btn-block">Join Goblaq</button>
        </div>
      </form>
      <style jsx>{ `
      .form {
        padding: 2em;
        border-top: solid black 2px;
      }
        }
    ` }</style>
    </React.Fragment>

  );
};
