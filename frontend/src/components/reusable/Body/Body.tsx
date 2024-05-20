import { ReactNode } from "react";

export type BodyProps = {
  children: ReactNode;
  className?: string;
};

export const Body = ({ children, className }: BodyProps) => (
  <p
    className={`text-slate-900"
      } text-base font-normal ${className}`}
  >
    {children}
  </p>
);
