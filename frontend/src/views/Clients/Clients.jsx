// COMPONENTS
import { ClientList } from "../homeView/ClientList/ClientList";
import { Button } from "../../@/components/ui/button";

// STATE
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export const Clients = () => {
  const { organizationId } = useParams();
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div
      className={`${darkMode ? "bg-sky-950" : "bg-slate-50"} px-10 py-5 h-fit`}
    >
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
