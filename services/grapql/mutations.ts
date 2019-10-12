
type earlySignups = {
  email_address: String;
  business_name?: String;
  city?: String;
  state?: String;
};
export const insertEarlySignups = ({
  business_name,
  city,
  email_address,
  state
}: earlySignups): Object => {
  const query: string = "mutation insert_early_signups($objects: [early_signups_insert_input!]! ) { insert_early_signups(objects: $objects) { returning { id } } }";
  return {
    query,
    variables: {
      objects: [
        {
          business_name,
          city,
          email_address,
          state
        }
      ]
    }
  };
};

