// STATE
import { ReactNode } from "react";

export type NameValuePairProps = {
  name: string;
  value: string;
  type?: string;
  children?: ReactNode;
};

export const NameValuePair = ({
  name,
  value = "",
  type,
  children,
}: NameValuePairProps) => {
  return (
    <div className="flex flex-col ml-2 my-3">
      <p className="text-slate-600 font-light text-left text-sm">{name}</p>
      <div
        className={`text-slate-800 font-normal text-left ${
          type === "header" ? "text-xl font-bold" : "text-base"
        }`}
      >
        {value && <>{value}</>}
        {children && <>{children}</>}
      </div>
    </div>
  );
};
