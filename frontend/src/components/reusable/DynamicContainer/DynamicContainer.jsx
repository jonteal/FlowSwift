// STATE
import { useSelector } from "react-redux";

export const DynamicContainer = ({ children, className }) => {
  const { darkMode } = useSelector((state) => state.theme);

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
