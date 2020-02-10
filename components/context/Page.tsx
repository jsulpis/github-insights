import Head, { HeadProps } from "components/context/Head";
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
          background-color: #fafafa;
        }
        .page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 85vh;
          padding: 2rem 0;
        }
      `}
    </style>
  </div>
);

export default Page;
