import React from "react";
import {useRouter} from "next/router";
import Button from "@material-ui/core/Button";

interface Props {
  children: any;
  className?: any;
}

export const BackButton: React.FC<any> = ({children, ...props}) => {
  const {back} = useRouter();
  return (
    <Button {...props} onClick={() => back()}>
      {children}
    </Button>
  );
};