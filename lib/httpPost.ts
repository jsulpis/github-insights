import fetch from "isomorphic-unfetch";

/**
 * Helper function to make API calls and testing pages easier
 * @param url: absolute url of the endpoint to call
 * @param body
 * @param headers
 */
export default async function httpPost<T>(
  url: string,
  body: object,
  headers: HeadersInit
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers
  });

  // only network errors are thrown by fetch so I throw others manually
  if (!res.ok) {
    return Promise.reject({ status: res.status, message: res.statusText });
  }

  return res.json();
}
