import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const Home = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div>
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
