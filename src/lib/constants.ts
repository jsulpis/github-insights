export const ROOT_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // Vercel does not put the protocol prefix
  : process.env.NEXT_PUBLIC_LOCAL_URL;
