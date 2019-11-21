import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useQuery } from "@apollo/react-hooks";
import { GET_BUSINESS_CATEGORIES } from "~/services/graphql/queries";
import LinearProgress from "@material-ui/core/LinearProgress";

import { ChangeFn } from "../../../common/interface";

interface SelectProps {
  onChange: ChangeFn;
  value: string;
  className?: string;
  required?: boolean;
  name?: string;
}

export const CategorySelect: React.SFC<SelectProps> = ({
  onChange,
  value,
  className,
  required,
  name
}) => {
  const { loading, error, data } = useQuery(GET_BUSINESS_CATEGORIES);

  if (loading) {
    return (
      <div className={className}>
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return <span>An Error Occured</span>;
  }

  const { business_categories } = data;

  return (
    <TextField
      required={required}
      select={true}
      onChange={onChange}
      className={className}
      name={name || "categoryID"}
      value={value}
      label="Category"
      variant="outlined"
    >
      {business_categories.map(category => (
        <MenuItem key={category.text} value={category.id}>
          {category.text}
        </MenuItem>
      ))}
    </TextField>
  );
};
