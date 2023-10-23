import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const Home = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      className={`mx-20 ${darkMode ? "bg-sky-950" : "white"} ${
        darkMode ? "text-sky-50" : "text-slate-900"
      }`}
    >
      <div className="mt-3 flex flex-row justify-center">
        <DynamicButton
          color="lightBlue"
          type="link"
          link="clients"
          className="mx-2"
        >
          Clients
        </DynamicButton>
        <DynamicButton
          color="lightBlue"
          type="link"
          link="projects"
          className="mx-2"
        >
          Projects
        </DynamicButton>
      </div>
    </div>
  );
};
