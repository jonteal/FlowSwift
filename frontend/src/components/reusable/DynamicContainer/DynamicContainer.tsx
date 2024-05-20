// STATE
import { ReactNode } from "react";
import { useAppSelector } from "../../../store/hooks";

export type DynamicContainerProps = {
  children: ReactNode;
  className?: string;
};

export const DynamicContainer = ({
  children,
  className,
}: DynamicContainerProps) => {
  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <div
      className={`${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } md:mx-2 p-3 rounded-xl ${className}`}
    >
      {children}
    </div>
  );
};
