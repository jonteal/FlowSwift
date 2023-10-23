import Table from "react-bootstrap/Table";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const ClientTable = ({ clients, clientContainer }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Table responsive>
      <thead>
        <tr>
          <th className="text-slate-400 font-light w-auto text-left pl-2">#</th>
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
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {clients
          .filter((client) => client.status === clientContainer.state)
          .map((client, index) => (
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
  );
};
