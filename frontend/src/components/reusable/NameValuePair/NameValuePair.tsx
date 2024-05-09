// STATE
import { ReactNode } from "react";
import { useAppSelector } from "../../../store/hooks";

export type NameValuePairProps = {
  name: string;
  value?: string;
  type?: string;
  children?: ReactNode;
};

export const NameValuePair = ({
  name,
  value,
  type,
  children,
}: NameValuePairProps) => {
  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <div className="flex flex-col ml-2 my-3">
      <p
        className={`${
          darkMode ? "text-slate-100" : "text-slate-600"
        } font-light text-left text-sm`}
      >
        {name}
      </p>
      <div
        className={`${
          darkMode ? "text-slate-50" : "text-slate-800"
        } font-normal text-left ${
          type === "header" ? "text-xl font-bold" : "text-base"
        }`}
      >
        {value && <>{value}</>}
        {children && <>{children}</>}
      </div>
    </div>
  );
};
