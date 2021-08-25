import "bootstrap/dist/css/bootstrap.min.css";
import { PageTransition } from "next-page-transitions";
import App from "next/app";
import "paper-dashboard-react/src/assets/css/paper-dashboard.min.css";
import React from "react";

export default class extends App {
  public render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <PageTransition timeout={300} classNames="page-transition">
          <Component {...pageProps} key={router.route} />
        </PageTransition>
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
      </>
    );
  }
}
