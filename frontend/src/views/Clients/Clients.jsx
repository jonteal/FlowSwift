import { ClientList } from "../homeView/ClientList/ClientList";
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";

export const Clients = () => {
  return (
    <div className="px-10 py-5">
      <DynamicButton color="red" type="link" link="/addClient">
        Add Client
      </DynamicButton>
      <ClientList />
    </div>
  );
};
