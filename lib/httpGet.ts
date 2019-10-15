import fetch from "isomorphic-unfetch";

/**
 * Helper function to make API calls and testing pages easier
 * @param url: absolute url of the endpoint to call
 */
export default async function httpGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}
