import Table from "react-bootstrap/Table";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/context";

export const ClientTable = ({ clients, clientContainer }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-auto text-left pl-2 border`}
          >
            #
          </th>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-2/12 text-left pl-2 border`}
          >
            First Name
          </th>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-2/12 text-left pl-2 border`}
          >
            Last Name
          </th>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-2/12 text-left pl-2 border`}
          >
            Phone Number
          </th>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-2/12 text-left pl-2 border`}
          >
            Email Address
          </th>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-3/12 text-left pl-2 border`}
          >
            Company
          </th>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-2/12 text-left pl-2 border`}
          >
            Status
          </th>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-2/12 text-left pl-2 border`}
          ></th>
          <th
            className={`${
              darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
            }  font-light w-2/12 text-left pl-2 border`}
          ></th>
        </tr>
      </thead>
      <tbody>
        {clients
          .filter((client) => client.status === clientContainer.state)
          .map((client, index) => (
            <tr key={client.id}>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2 pr-2`}
              >
                {index + 1}
              </td>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2`}
              >
                {client.firstName}
              </td>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2`}
              >
                {client.lastName}
              </td>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2`}
              >
                {client.phoneNumber}
              </td>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2`}
              >
                {client.emailAddress}
              </td>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2`}
              >
                {client.companyName}
              </td>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2`}
              >
                {client.status}
              </td>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2`}
              >
                <Link to={`/clients/${client.id}/dashboard`}>
                  <FaRegEye
                    className={`${
                      darkMode ? "text-sky-200" : "text-sky-600"
                    } mr-2`}
                  />
                </Link>
              </td>
              <td
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                }  font-light text-left border pl-2`}
              >
                {/* <button>
                  <FaRegTrashAlt className="text-red-500" />
                </button> */}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
