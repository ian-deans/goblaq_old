import React from "react";
import { useRouter } from "next/router";
import { BackButton } from "~/components/common/BackButton";
import { useLazyQuery } from "@apollo/react-hooks";
import {GET_FORUM_BY_ID} from "~/services/graphql/queries";

const ViewForumPage = () => {
  const { forumID } = useRouter().query;
  const [getForum, forumQueryData] = useLazyQuery(GET_FORUM_BY_ID)
  const [state, setState] = React.useState({data: undefined});



  React.useEffect(() => {

    if (forumID) {
      getForum({variables: {id: forumID}});
    }
  }, [forumID]);

  React.useEffect(() => {
    const { loading, error, data } = forumQueryData;
    if (loading) {
      console.log("loading");
    }

    if (data) {
      console.log("DATA  ", data);
      setState({data});
    }
  }, [forumQueryData]);


  if (!state.data) {
    return <div>Awaiting forum data...</div>;
  }

  return (
    <section>
      <BackButton color="secondary" variant="contained">Back</BackButton>
      <div>
        View Forum
      </div>
      {forumID}
    </section>
  );
};

export default ViewForumPage;

function selectForumData({forums}) {
  const {id, name, description} = forums[0];

  const posts = forums[0].posts.map(({created_at, updated_at, title, }) => {
    return
  })

  return {id, name, description, posts};
}