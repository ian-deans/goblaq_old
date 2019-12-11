import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const PostForm = ({ submitFn, changeFn, title, content, saving }) => {
  return (
    <form
      onSubmit={submitFn}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        variant="outlined"
        label="Title"
        name="title"
        value={title}
        onChange={changeFn}
      />
      <TextField
        variant="outlined"
        multiline={true}
        rows={6}
        label="Content"
        name="content"
        value={content}
        onChange={changeFn}
      />
      <Button type="submit" disabled={saving}>
        Post
      </Button>
    </form>
  );
};
