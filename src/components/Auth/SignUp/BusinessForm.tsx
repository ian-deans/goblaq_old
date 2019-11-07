import React from "react";
import { Button, Form, Input, Select } from "semantic-ui-react";
import { formProps } from "./propTypes";
import { LogoUpload } from "./LogoUpload";
import ReCAPTCHA from "react-google-recaptcha";

export const BusinessForm: React.FunctionComponent<formProps> = ({
  data,
  handleChangeFn,
  handleSubmitFn,
  setFileFn,
  loading,
  uploadState,
  uploadPercent,
  logoUrl,
  businessCategories,
  recaptchaRef
}) => {
  return (
    <Form size={"small"} onSubmit={handleSubmitFn} loading={loading}>
      <Form.Group widths={16}>
        <Form.Field width={12} required={true}>
          <label>Business Name</label>
          <Input
            onChange={handleChangeFn}
            id="businessNameInput"
            value={data.businessName}
            name="businessName"
            placeholder="Enter the name of your business"
          />
        </Form.Field>
        <Form.Field width={4} required={true}>
          <label>Category</label>
          <Select
            fluid={true}
            inline={true}
            placeholder="Select One"
            name="businessCategory"
            options={businessCategories}
            onChange={handleChangeFn}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field width={16} required={true}>
        <label>Name</label>
        <Input
          onChange={handleChangeFn}
          className="form-control"
          value={data.name}
          name="name"
        />
      </Form.Field>
      <Form.Field required={true}>
        <label>Email</label>
        <Input
          onChange={handleChangeFn}
          id="emailInput"
          value={data.email}
          name="email"
        />
      </Form.Field>
      <Form.Field required={true}>
        <label>Address</label>
        <Input
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
          <Input
            onChange={handleChangeFn}
            id="cityInput"
            value={data.city}
            name="city"
            placeholder="City"
          />
        </Form.Field>
        <Form.Field width={3} required={true}>
          <label>State</label>
          <Input
            onChange={handleChangeFn}
            id="stateInput"
            value={data.state}
            name="state"
            placeholder="State"
          />
        </Form.Field>
        <Form.Field width={3} required={true}>
          <label>Zip</label>
          <Input
            onChange={handleChangeFn}
            value={data.zip}
            name="zip"
            placeholder="Zip"
          />
        </Form.Field>
      </Form.Group>
      <Form.Field required={true}>
        <label>Upload Logo</label>
        <LogoUpload
          uploadState={uploadState}
          uploadPercent={uploadPercent}
          setFile={setFileFn}
          logoUrl={logoUrl}
        />
      </Form.Field>
      <Form.Field>
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
      <Button.Group fluid={true}>
        <Button color="black">Join Goblaq</Button>
      </Button.Group>
    </Form>
  );
};
