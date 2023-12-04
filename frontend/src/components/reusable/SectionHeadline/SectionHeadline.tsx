import type { ReactNode } from "react";

export type SectionHeadlineProps = {
  children: ReactNode;
  className: string
}

export const SectionHeadline = ({ children, className }: SectionHeadlineProps) => (
  <h2 className={`text-lg font-bold mt-3 ${className}`}>{children}</h2>
);
