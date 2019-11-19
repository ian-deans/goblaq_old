import React from "react";
import {GoogleButton} from "../src/components/Auth/AuthButtons/GoogleButton";
import {FacebookButton} from "../src/components/Auth/AuthButtons/FacebookButton";

export default props => {


  const inProduction = process.env.NODE_ENV === "production";

  return (
    <div>
      <GoogleButton disabled={false} />
      <FacebookButton disabled={false} />
    </div>
  );
};