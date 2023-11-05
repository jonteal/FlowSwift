import { ClientList } from "../homeView/ClientList/ClientList";
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";

export const Clients = () => (
  <div className="px-10 py-5">
    <DynamicButton className="mb-4" color="red" type="link" link="/addClient">
      Add Client
    </DynamicButton>
    <ClientList />
  </div>
);
