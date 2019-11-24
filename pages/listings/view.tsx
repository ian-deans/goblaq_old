import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { GET_BUSINESS_BY_ID } from "~/services/graphql/queries";

const Loading = () => <span>Loading...</span>;

const ViewListing = () => {
  const { businessID } = useRouter().query;

  if (!businessID) {
    return <div>ERROR</div>;
  }

  const variables = { businessID };

  const { loading, error, data } = useQuery(GET_BUSINESS_BY_ID, { variables });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      { data && (<h2>{data.businesses[0].name}</h2>)}

      { data && (
        <div>
          {data.businesses[0].contacts.map((c, i) => {
            return (
              <div key={i}>
                {c.contact_type} {c.contact_value}
              </div>
            );
          })}
        </div>
      )}

      { data && (
        <div>
          <div>{data.businesses[0].location.address1}</div>
          <div>{data.businesses[0].location.address2}</div>
          <div>{data.businesses[0].location.city}</div>
          <div>{data.businesses[0].location.state}</div>
        </div>
      )}
    </div>
  );
};

export default ViewListing;
