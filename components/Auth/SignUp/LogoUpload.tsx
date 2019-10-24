import React, { useState } from "react";
import { Button, Image, Input, Progress } from "semantic-ui-react";

export const LogoUpload = ({ setFile, uploadState, uploadPercent, logoUrl }) => {

  const handleChange = (event: any) => {
    const file: any = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  if (uploadState === "complete") {
    return (
      <Input type="text" readOnly={true} value="File uploaded!">
        <Image src={logoUrl} size="small" avatar={false} />
        <input />
      </Input>
    );
  }

  if (uploadState === "uploading") {
    return <Progress percent={uploadPercent} progress />;
  }

  return (
    <Input onChange={handleChange} type="file" name="logo_file" fluid={true}>
      <input />
      {/* <Button onClick={sendFile}>Upload</Button> */}
    </Input>
  );
};
