import { Link, useParams } from "react-router-dom";

// ICONS
import { FaRegEye } from "react-icons/fa";

// COMPONENTS
import { DeleteModal } from "../modals/DeleteModal/DeleteModal";
// import { EditClientModal } from "../modals/EditClientModal/EditClientModal";

// STATE
import { ClientContainerType, ClientType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";

export type ClientTableProps = {
  clients: ClientType[];
  clientContainer: ClientContainerType;
};

export const ClientTable = ({ clients, clientContainer }: ClientTableProps) => {
  const { organizationId } = useParams();

  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  return (
    <>
      <Table>
        <TableCaption>A list of your services</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-[100px]">First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients
            .filter((client) => client.status === clientContainer.state)
            .map((client, index) => (
              <TableRow key={client.id}>
                <TableCell className="text-left">{index + 1}</TableCell>
                <TableCell className="text-left">{client.firstName}</TableCell>
                <TableCell className="text-left">{client.lastName}</TableCell>
                <TableCell className="text-left">
                  {client.phoneNumber}
                </TableCell>
                <TableCell className="text-left">
                  {client.emailAddress}
                </TableCell>
                <TableCell className="text-left">
                  {client.companyName}
                </TableCell>
                <TableCell>{client.status}</TableCell>
                <TableCell>
                  <Link
                    to={`/organizations/${organizationId}/clients/${client.id}/dashboard`}
                  >
                    <FaRegEye
                      className={`${
                        darkMode ? "text-sky-200" : "text-sky-600"
                      } mr-2`}
                    />
                  </Link>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <DeleteModal
                    subject="Client"
                    organizationId={client?.organization?.id || ""}
                    clientId={client.id}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
