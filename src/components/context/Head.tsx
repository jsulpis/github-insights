import NextHead from "next/head";
import { FC } from "react";

const defaultTitle = "GitHub Insights";
const defaultDescription = "Insights into a GitHub account.";
const defaultOGURL = "https://github-insights.now.sh";
const defaultOGImage = defaultOGURL + "/static/screenshot.png";

export interface HeadProps {
  description?: string;
  ogImage?: string;
  title?: string;
  url?: string;
}

export const Head: FC<HeadProps> = ({ description, ogImage, title, url }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || defaultTitle}</title>
    <meta name="description" content={description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/static/favicon.ico" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Montserrat:400,600"
    />
    <meta property="og:url" content={url || defaultOGURL} />
    <meta property="og:title" content={title || defaultTitle} />
    <meta property="og:description" content={description || defaultDescription} />
    <meta name="twitter:site" content={url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage || defaultOGImage} />
    <meta property="og:image" content={ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="680" />
  </NextHead>
);
