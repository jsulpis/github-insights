import { Head, HeadProps } from "components/context/Head";
import { FC } from "react";

export const Page: FC<HeadProps> = ({ children, ...headProps }) => (
  <div className="page">
    <Head {...headProps} />
    {children}
  </div>
);
