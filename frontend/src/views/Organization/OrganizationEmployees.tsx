import { Link, useParams } from "react-router-dom";
import { GET_USERS } from "../../graphql/queries/userQueries";
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { useQuery } from "@apollo/client";
// import { useSelector } from "react-redux";
import { EmployeeRowItem } from "../../components/EmployeeRowItem/EmployeeRowItem";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { UserType } from "../../types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";

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
        <Table>
          <TableCaption>A list of your employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.users.map((user: UserType, index: number) => (
              <EmployeeRowItem key={user._id} index={index} employee={user} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
