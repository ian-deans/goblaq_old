
export function setViewerHTTPHeader() {
  return {context: { headers: { "x-hasura-role": "viewer" } }};
}