import { Link, useParams } from "react-router-dom";

// ICONS
import { FaGasPump } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";

// COMPONENTS
import { DynamicButton } from "../reusable/DynamicButton/DynamicButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";

// STATE
// import { useSelector } from "react-redux";

// UTILS
import { capitalized } from "../../utils/format";
import { DynamicContainer } from "../reusable/DynamicContainer/DynamicContainer";
import { ServiceType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export type ServicesTableProps = {
  services: ServiceType[];
  type?: "In House" | "Third Party Services";
};

export const ServicesTable = ({ services, type }: ServicesTableProps) => {
  const { clientId, projectId, organizationId } = useParams();
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  return (
    <DynamicContainer
      className={`rounded-xl ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } mx-2 mt-3 px-3 w-full`}
    >
      <div className="flex flex-row justify-between items-center py-3">
        <div className="flex flex-row items-center">
          <div
            className={`${
              type === "In House" ? "bg-sky-500" : "bg-purple-500"
            } p-2 rounded-full text-slate-50`}
          >
            {type === "In House" ? <AiFillHome /> : <FaGasPump />}
          </div>
          <h2
            className={`text-left ${
              darkMode ? "text-slate-50" : "text-slate-700"
            }  text-lg mx-2`}
          >
            {type === "In House" ? "In House" : "Third Party Services"}
          </h2>
        </div>
        <DynamicButton
          type="link"
          color="red"
          link={`/organizations/${organizationId}/clients/${clientId}/projects/${projectId}/addService`}
        >
          Add Service
        </DynamicButton>
      </div>
      {services.length === 0 ? (
        <p className="italic text-lg py-3 px-2">
          You do not currently have any active services for this project
        </p>
      ) : (
        <Table>
          <TableCaption>A list of your services</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="w-[100px]">Service</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>EndDate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={service.id}>
                <TableCell className="text-left">{index + 1}</TableCell>
                <TableCell className="text-left">{service.service}</TableCell>
                <TableCell className="text-left">$ {service.cost}</TableCell>
                <TableCell className="text-left">
                  <span
                    className={`${
                      service.status === "on"
                        ? "bg-green-400 text-slate-700"
                        : "bg-red-500 text-slate-50"
                    } w-full font-semibold px-10 py-1 self-center rounded-md text-center`}
                  >
                    {capitalized(service.status)}
                  </span>
                </TableCell>
                <TableCell className="text-left">{service.startDate}</TableCell>
                <TableCell className="text-left">{service.endDate}</TableCell>
                <TableCell>
                  <Link
                    to={`/organizations/${organizationId}/clients/${clientId}/projects/${projectId}/services/${service.id}`}
                  >
                    <FaRegEye className="text-sky-600" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DynamicContainer>
  );
};
