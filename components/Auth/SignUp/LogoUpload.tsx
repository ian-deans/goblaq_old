import React, { useState } from "react";
import { Button, Image, Input, Progress } from "semantic-ui-react";
import mime from "mime-types";

const authorizedFileTypes = ["image/jpeg", "image/png", "image/gif"];

const isAuthorized = (fileName: any) =>
  authorizedFileTypes.includes(mime.lookup(fileName));

export const LogoUpload = ({ uploadFile, uploadState, uploadPercent, logoUrl }) => {
  const [file, setFile] = useState(null);

  const handleChange = (event: any) => {
    const file: any = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const sendFile = event => {
    event.preventDefault();
    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
      }
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
      <Button onClick={sendFile}>Upload</Button>
    </Input>
  );
};
