// COMPONENTS
import { ClientList } from "../homeView/ClientList/ClientList";
import { Button } from "../../@/components/ui/button";
import { Link, useParams } from "react-router-dom";

export const Clients = () => {
  const { organizationId } = useParams();

  return (
    <div className="bg-slate-50 px-10 py-5 h-fit">
      <Button asChild>
        <Link
          className="mb-4"
          to={`/organizations/${organizationId}/addClient`}
        >
          Add Client
        </Link>
      </Button>
      <ClientList />
    </div>
  );
};
