import { Link, useParams } from "react-router-dom";
import { GET_USERS } from "../../graphql/queries/userQueries";
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { useQuery } from "@apollo/client";
// import { useSelector } from "react-redux";
import { EmployeeRowItem } from "../../components/EmployeeRowItem/EmployeeRowItem";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { UserType } from "../../types/types";

export const OrganizationEmployees = () => {
  const { organizationId } = useParams();
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USERS, {
    variables: { organizationId },
  });

  if (userLoading) return <Spinner />;
  if (userError) return <p>There was an error...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold my-3">Employees</h1>
      <div className="flex flex-col">
        <table className="mx-3">
          <thead>
            <tr>
              <th
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                } text-left pl-2 border`}
              >
                #
              </th>
              <th
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                } text-left pl-2 border`}
              >
                Name
              </th>
              <th
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                } text-left pl-2 border`}
              >
                Email
              </th>
              <th
                className={`${
                  darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
                } text-left pl-2 border`}
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.users.map((user: UserType, index: number) => (
              <EmployeeRowItem key={user._id} index={index} employee={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
