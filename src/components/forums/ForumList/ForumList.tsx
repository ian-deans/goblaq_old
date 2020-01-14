import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_FORUMS_BY_TYPE } from "~/services/graphql/queries";
import LinearProgress from "@material-ui/core/LinearProgress";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ForumSection } from "./ForumSection";

export interface ForumData {
  name: string | string[];
  description: string;
  created_at: string;
  posts_aggregate: any;
  id: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {},
    section: {},
    linkPaper: {},
  })
);

export const ForumList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_FORUMS_BY_TYPE, {
    ...setViewerHTTPHeader(),
  });

  if (loading) {
    return <LinearProgress />;
  }

  console.log(data);
  let thing = {};

  const sections = data ? (
    data.forum_types.map((d, i) => <ForumSection key={i} {...d} />)
  ) : (
    <LinearProgress />
  );

  return <div>{sections}</div>;
};
