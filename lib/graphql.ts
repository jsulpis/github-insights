import fetch from "isomorphic-unfetch";

/**
 * Helper function for the GitHub graphql API
 * @param query
 */
export default async function graphql<T>(query: string): Promise<T> {
  const GRAPHQL_API = "https://api.github.com/graphql";
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  const res = await fetch(GRAPHQL_API, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers
  });

  // only network errors are thrown by fetch so I throw others manually
  if (!res.ok) {
    return Promise.reject({ status: res.status, message: res.statusText });
  }

  // the graphql API returns errors in the body and not with the HTTP status,
  // so again I throw them manually
  return res.json().then(response => {
    if (response.errors) {
      if (response.errors[0].type === "NOT_FOUND") {
        throw { status: 404, message: "User not found" };
      } else {
        throw { status: 500, message: "Server error. Please try again later." };
      }
    }
    return response;
  });
}
