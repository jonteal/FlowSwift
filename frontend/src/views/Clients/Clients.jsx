import { ClientList } from "../homeView/ClientList/ClientList";
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const Clients = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      className={`${darkMode ? "bg-sky-950" : "bg-slate-50"} px-10 py-5 h-fit`}
    >
      <DynamicButton className="mb-4" color="red" type="link" link="/addClient">
        Add Client
      </DynamicButton>
      <ClientList />
    </div>
  );
};
