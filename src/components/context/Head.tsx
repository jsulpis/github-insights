import NextHead from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

const defaultTitle = "GitHub Insights";
const defaultDescription = "Insights into a GitHub account.";
const rootURL = process.env.NEXT_PUBLIC_VERCEL_URL;
const defaultOGImage = rootURL + "/thumbnail.jpg";

export interface HeadProps {
  description?: string;
  ogImage?: string;
  title?: string;
}

export const Head: FC<HeadProps> = ({
  description = defaultDescription,
  ogImage = defaultOGImage,
  title = defaultTitle
}) => {
  const relativeUrl = useRouter().asPath;

  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:site_name" content="GitHub Insights" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={rootURL + relativeUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
    </NextHead>
  );
};
