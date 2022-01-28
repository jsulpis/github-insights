import httpGet from "./httpGet";

/**
 * Helper function to make API calls and testing pages easier
 * @param name: relative url of the API to call (will be appended to /api)
 * @param headers: optional headers
 */
export default async function apiGet<T>(name: string, headers?: HeadersInit): Promise<T> {
  const ROOT_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const API_URL = "/api";

  return httpGet<T>(ROOT_URL + API_URL + name, headers);
}
