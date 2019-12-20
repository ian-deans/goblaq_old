import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { GET_FORUMS_WITH_POST_COUNT } from "~/services/graphql/queries";
import LinearProgress from "@material-ui/core/LinearProgress";
import { setViewerHTTPHeader } from "~/services/graphql/helpers";
import Paper from "@material-ui/core/Paper";

interface ForumData {
  name: string | string[];
  description: string;
  created_at: string;
  posts_aggregate: any;
  id: number;
}

interface LinkProps extends ForumData {
  key?: any;
}

export const ForumList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_FORUMS_WITH_POST_COUNT, {...setViewerHTTPHeader()});

  if (loading) {
    return <LinearProgress />;
  }

  const links = data
    ? data.forums.map(
        (forum: ForumData, i: number): React.ReactElement => (
          <ForumLink key={i} {...forum} />
        )
      )
    : <LinearProgress />;

  return <div>{links}</div>;
};

const ForumLink: React.FC<LinkProps> = props => {
  return (
    <Link href={`/forums/view?forumID=${props.id}`}>
      <Paper>
        <div>{props.name}</div>
        <div>{props.description}</div>
        <div>{props.created_at}</div>
      </Paper>
    </Link>
  );
};
