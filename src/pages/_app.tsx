import "styles/global.scss";
import NextNprogress from "nextjs-progressbar";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress options={{ trickleSpeed: 20 }} />
      <Component {...pageProps} />
    </>
  );
}
