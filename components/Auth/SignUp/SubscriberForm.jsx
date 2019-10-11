import React from "react";
import { Button, Form } from "semantic-ui-react";

export const SubscriberForm = ( { data, handleChangeFn, handleSubmitFn, loading } ) => {

  return (
    <Form size="small" onSubmit={ handleSubmitFn } loading={ loading }>
      <Form.Field required={ true }>
        <label>Name</label>
        <input onChange={ handleChangeFn }
          id="businessNameInput"
          className="form-control"
          value={ data.name }
          name="name"
          placeholder="Enter your name"
        />
      </Form.Field>
      <Form.Field required={ true }>
        <label>Email</label>
        <input onChange={ handleChangeFn } id="cityInput" className="form-control" value={ data.email } name="email" placeholder="Your email Address" />

      </Form.Field>
      <Form.Group widths={ 16 }>
        <Form.Field width={ 10 }>
          <label>City</label>
          <input
            onChange={ handleChangeFn }
            id="cityInput"
            className="form-control"
            value={ data.city }
            name="city"
            placeholder="City"
          />

        </Form.Field>
        <Form.Field width={ 3 }>
          <label>State</label>
          <input onChange={ handleChangeFn } id="stateInput" className="form-control" value={ data.state } name="state" placeholder="State" />

        </Form.Field>
        <Form.Field width={ 3 }>
          <label>Zip</label>
          <input onChange={ handleChangeFn } id="zipInput" className="form-control" value={ data.zip } name="zip" placeholder="Zip" />

        </Form.Field>
      </Form.Group>
      <Form.Field>
        <input name="userType" value="subscriber" type="hidden" />
      </Form.Field>
      <Button.Group fluid>
        <Button color="black">Join Goblaq</Button>
      </Button.Group>
    </Form>

  );
};
