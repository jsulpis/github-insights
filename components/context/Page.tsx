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
        @import "node_modules/paper-dashboard-react/src/assets/scss/paper-dashboard/variables";

        body {
          text-align: center;
          background-color: $default-body-bg;
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
