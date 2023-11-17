// STATE
import { useSelector } from "react-redux";

export const Body = ({ children, className }) => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <p
      className={`${
        darkMode ? "text-slate-50" : "text-slate-900"
      } text-base font-normal ${className}`}
    >
      {children}
    </p>
  );
};
