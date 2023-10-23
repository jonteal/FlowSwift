import { Link, useParams } from "react-router-dom";

// ICONS
import { FaGasPump } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";

// COMPONENTS
import { DynamicButton } from "../../reusable/DynamicButton/DynamicButton";
import Table from "react-bootstrap/Table";
import { capitalized } from "../../../utils/format";

export const ServicesTable = ({ services, type }) => {
  const { clientId, projectId } = useParams();

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 px-3 w-full">
      <div className="flex flex-row justify-between items-center py-3">
        <div className="flex flex-row items-center">
          <div
            className={`${
              type === "In House" ? "bg-sky-500" : "bg-purple-500"
            } p-2 rounded-full text-slate-50`}
          >
            {type === "In House" ? <AiFillHome /> : <FaGasPump />}
          </div>
          <h2 className="text-left text-slate-700 text-lg mx-2">
            {type === "In House" ? "In House" : "Third Party Services"}
          </h2>
        </div>
        <DynamicButton
          type="link"
          color="red"
          link={`/clients/${clientId}/projects/${projectId}/addService`}
        >
          Add Service
        </DynamicButton>
      </div>
      {services.length === 0 ? (
        <p className="italic text-lg py-3 px-2">
          You do not currently have any active services for this project
        </p>
      ) : (
        <Table responsive>
          <thead className="border">
            <tr>
              <th className="text-slate-400 font-light w-10 text-left pl-2 border">
                #
              </th>
              <th className="text-slate-400 font-light w-2/12 text-left pl-2 border">
                Service
              </th>
              <th className="text-slate-400 font-light w-2/12 text-left pl-2 border">
                Cost
              </th>
              <th className="text-slate-400 font-light w-2/12 text-left pl-2 border">
                Status
              </th>
              <th className="text-slate-400 font-light w-2/12 text-left pl-2 border">
                Start Date
              </th>
              <th className="text-slate-400 font-light w-2/12 text-left pl-2 border">
                End Date
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id}>
                <td className="text-slate-700 font-light text-left border pl-2 pr-2">
                  {index + 1}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  {service.service}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  $ {service.cost}
                </td>
                <td className="font-light text-left flex flex-row justify-center">
                  <span
                    className={`${
                      service.status === "on"
                        ? "bg-green-400 text-slate-700"
                        : "bg-red-500 text-slate-50"
                    } w-full font-semibold px-10 py-1 self-center rounded-md text-center`}
                  >
                    {capitalized(service.status)}
                  </span>
                </td>

                <td className="text-slate-700 font-light text-left border pl-2">
                  {service.startDate}
                </td>
                <td className="text-slate-700 font-light text-left border pl-2">
                  {service.endDate === "Invalid date"
                    ? "Current"
                    : service.endDate}
                </td>
                <td>
                  <Link
                    to={`/clients/${clientId}/projects/${projectId}/services/${service.id}`}
                  >
                    <FaRegEye className="text-sky-600" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
