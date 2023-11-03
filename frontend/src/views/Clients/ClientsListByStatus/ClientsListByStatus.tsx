import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

// ICONS
import { FaChevronDown, FaChevronUp, FaRegEye } from "react-icons/fa";

// GRAPHQL
import { GET_CLIENTS_BY_STATUS } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import Table from "react-bootstrap/esm/Table";

import { ClientType } from "../types";

export const ClientsListByStatus = () => {
  const { status } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS_BY_STATUS, { variables: { status } });

  console.log('clientData: ', clientData)

  if (clientLoading) return <Spinner />;
  if (clientError)
    return <p>There was a problem loading the client information...</p>;
  return (
    <>
      <h1 className="text-2xl mt-4 mb-2">{status}</h1>
      <h2 className="mb-4">
        Total {status} Records: {clientData.clientsByStatus.length}
      </h2>
      <div className="mb-7 border-slate-400 p-2 rounded-md mx-5">
        <div className="flex flex-row items-center justify-between border rounded-xl">
          <div className="flex flex-row items-center">
            <h5 className="text-base py-2 pl-2">{status}</h5>
            {isExpanded ? (
              <FaChevronUp onClick={handleClick} className="ml-2" />
            ) : (
              <FaChevronDown onClick={handleClick} className="ml-2" />
            )}
          </div>
        </div>

        {isExpanded && (
          <Table responsive>
            <thead>
              <tr>
                <th className="text-slate-400 font-light w-auto text-left pl-2">
                  #
                </th>
                <th className="text-slate-400 font-light w-2/12 text-left pl-2">
                  First Name
                </th>
                <th className="text-slate-400 font-light w-2/12 text-left pl-2">
                  Last Name
                </th>
                <th className="text-slate-400 font-light w-2/12 text-left pl-2">
                  Phone Number
                </th>
                <th className="text-slate-400 font-light w-2/12 text-left pl-2">
                  Email Address
                </th>
                <th className="text-slate-400 font-light w-3/12 text-left pl-2">
                  Company
                </th>
                <th className="text-slate-400 font-light w-2/12 text-left pl-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {clientData.clientsByStatus.map((client: ClientType, index: number) => (
                <tr key={client.id}>
                  <td className="text-slate-700 font-light text-left border pl-2 pr-2">
                    {index + 1}
                  </td>
                  <td className="text-slate-700 font-light text-left border pl-2">
                    {client.firstName}
                  </td>
                  <td className="text-slate-700 font-light text-left border pl-2">
                    {client.lastName}
                  </td>
                  <td className="text-slate-700 font-light text-left border pl-2">
                    {client.phoneNumber}
                  </td>
                  <td className="text-slate-700 font-light text-left border pl-2">
                    {client.emailAddress}
                  </td>
                  <td className="text-slate-700 font-light text-left border pl-2">
                    {client.companyName}
                  </td>
                  <td className="text-slate-700 font-light text-left border pl-2">
                    {client.status}
                  </td>
                  <td className="text-slate-700 font-light text-left border pl-2">
                    <Link to={`/clients/${client.id}/dashboard`}>
                      <FaRegEye className="text-sky-600" />
                    </Link>
                  </td>
                  <td className="text-slate-700 font-light text-left border pl-2">
                    {/* <button>
                        <FaRegTrashAlt className="text-red-500" />
                      </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};
