import React from "react";
import { Button, Form } from "semantic-ui-react";
import { formProps } from "./propTypes";
import { LogoUpload } from "./LogoUpload";

export const BusinessForm: React.FunctionComponent<formProps> = ({
  data,
  handleChangeFn,
  handleSubmitFn,
  loading,
  uploadFile,
  uploadState,
  uploadPercent,
  logoUrl,
}) => {
  return (
    <Form size={"small"} onSubmit={handleSubmitFn} loading={loading}>
      <Form.Group widths={16}>
        <Form.Field width={12} required={true}>
          <label>Business Name</label>
          <input
            onChange={handleChangeFn}
            id="businessNameInput"
            value={data.name}
            name="businessName"
            placeholder="Enter your business name"
          />
        </Form.Field>
        <Form.Field width={4} required={true}>
          <label>Category</label>
          <select>
            <option>Select One</option>
          </select>
        </Form.Field>
      </Form.Group>
      <Form.Field required={true}>
        <label>Email</label>
        <input
          onChange={handleChangeFn}
          id="emailInput"
          value={data.email}
          name="email"
        />
      </Form.Field>
      <Form.Field required={true}>
        <label>Address</label>
        <input
          onChange={handleChangeFn}
          id="cityInput"
          value={data.address}
          name="address"
          placeholder="123 Main Street"
        />
      </Form.Field>
      <Form.Group widths={16} required={true}>
        <Form.Field width={10} required={true}>
          <label>City</label>
          <input
            onChange={handleChangeFn}
            id="cityInput"
            value={data.city}
            name="city"
            placeholder="City"
          />
        </Form.Field>
        <Form.Field width={3} required={true}>
          <label>State</label>
          <input
            onChange={handleChangeFn}
            id="stateInput"
            value={data.state}
            name="state"
            placeholder="State"
          />
        </Form.Field>
        <Form.Field width={3} required={true}>
          <label>Zip</label>
          <input
            onChange={handleChangeFn}
            id="zipInput"
            value={data.zip}
            name="zip"
            placeholder="Zip"
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Upload Logo</label>
        <LogoUpload
          uploadState={uploadState}
          uploadPercent={uploadPercent}
          uploadFile={uploadFile}
          logoUrl={logoUrl}
        />
      </Form.Field>
      <Form.Field>
        <div
          className="g-recaptcha"
          data-sitekey="6LfQM7sUAAAAAG-CxCHZ7sfpR284B-rrd89dGS76"
        />
      </Form.Field>
      <Button.Group fluid>
        <Button color="black">Join Goblaq</Button>
      </Button.Group>
    </Form>
  );
};
