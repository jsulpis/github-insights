import Head, { HeadProps } from "components/Head";
import React, { ReactNode } from "react";

export interface PageProps extends HeadProps {
  title: string;
  children: ReactNode;
}

const Page = (props: PageProps) => (
  <div className="page">
    <Head {...props} />
    {props.children}
    <style global jsx>
      {`
        body {
          text-align: center;
          font-family: Segoe UI, Helvetica, Arial, sans-serif;
        }
        .page {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100%;
          background-color: #fafafa;
        }
      `}
    </style>
  </div>
);

export default Page;
