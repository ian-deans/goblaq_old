import React from "react";
import { Button, Form } from "semantic-ui-react";
import { formProps } from "./propTypes";
import ReCAPTCHA from "react-google-recaptcha";

export const SubscriberForm: React.FunctionComponent<formProps> = ({
  data,
  handleChangeFn,
  handleSubmitFn,
  loading,
  recaptchaRef,
}) => {
  return (
    <Form size="small" onSubmit={handleSubmitFn} loading={loading}>
        <Form.Field required={true}>
          <label>Name</label>
          <input
            onChange={handleChangeFn}
            className="form-control"
            value={data.name}
            name="name"
          />
        </Form.Field>
      <Form.Field required={true}>
        <label>Email</label>
        <input
          onChange={handleChangeFn}
          id="cityInput"
          className="form-control"
          value={data.email}
          name="email"
          placeholder="Your email Address"
        />
      </Form.Field>
      <Form.Group widths={16}>
        <Form.Field required={true} width={10}>
          <label>City</label>
          <input
            onChange={handleChangeFn}
            id="cityInput"
            className="form-control"
            value={data.city}
            name="city"
            placeholder="City"
          />
        </Form.Field>
        <Form.Field required={true} width={3}>
          <label>State</label>
          <input
            onChange={handleChangeFn}
            id="stateInput"
            className="form-control"
            value={data.state}
            name="state"
            placeholder="State"
          />
        </Form.Field>
        <Form.Field required={true} width={3}>
          <label>Zip</label>
          <input
            onChange={handleChangeFn}
            id="zipInput"
            className="form-control"
            value={data.zip}
            name="zip"
            placeholder="Zip"
          />
        </Form.Field>
      </Form.Group>
      <Form.Field required={true}>
      <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfQM7sUAAAAAG-CxCHZ7sfpR284B-rrd89dGS76"
          name="captcha"
          onChange={handleChangeFn}
        />
        {/* <div
          className="g-recaptcha"
          data-sitekey="6LfQM7sUAAAAAG-CxCHZ7sfpR284B-rrd89dGS76"
        /> */}
      </Form.Field>
      <Form.Field>
        <input name="userType" value="subscriber" type="hidden" />
      </Form.Field>
      <Button.Group fluid>
        <Button color="black">Join Goblaq</Button>
      </Button.Group>
    </Form>
  );
};
