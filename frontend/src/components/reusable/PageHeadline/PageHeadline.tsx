import { ReactNode } from "react";

export type PageHeadlineProps = {
  children: ReactNode,
  className?: string
}

export const PageHeadline = ({ children, className }: PageHeadlineProps) =>  (
    <h1 className={`${className} font-semibold text-lg mt-2`}>{children}</h1>
  );
