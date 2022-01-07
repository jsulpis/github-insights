import App from "next/app";
import { PageTransition } from "next-page-transitions";
import "styles/global.scss";

export default class MyApp extends App {
  public render() {
    const { Component, pageProps, router } = this.props;
    return (
      <PageTransition timeout={300} classNames="page-transition">
        <Component {...pageProps} key={router.route} />
      </PageTransition>
    );
  }
}
