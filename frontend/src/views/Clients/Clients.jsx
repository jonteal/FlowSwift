// COMPONENTS
import { ClientList } from "../homeView/ClientList/ClientList";
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";

// STATE
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Clients = () => {
  const { organizationId } = useParams();
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div
      className={`${darkMode ? "bg-sky-950" : "bg-slate-50"} px-10 py-5 h-fit`}
    >
      <DynamicButton
        className="mb-4"
        color="red"
        type="link"
        link={`/organizations/${organizationId}/addClient`}
      >
        Add Client
      </DynamicButton>
      <ClientList />
    </div>
  );
};
