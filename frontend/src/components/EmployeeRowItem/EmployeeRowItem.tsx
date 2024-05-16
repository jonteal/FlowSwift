// import { useSelector } from "react-redux";
import { UserType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { TableCell, TableRow } from "../../@/components/ui/table";

export type EmployeeRowItemProps = {
  index: number;
  employee: UserType;
};

export const EmployeeRowItem = ({ index, employee }: EmployeeRowItemProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const { name, email, role } = employee;

  return (
    <TableRow
      className={`${
        darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
      } font-light text-left border pl-2 pr-2`}
    >
      <TableCell
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        } font-light text-left border pl-2`}
      >
        {index + 1}
      </TableCell>
      <TableCell
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        } font-light text-left border pl-2`}
      >
        {name}
      </TableCell>
      <TableCell
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        } font-light text-left border pl-2`}
      >
        {email}
      </TableCell>
      <TableCell
        className={`${
          darkMode ? "bg-sky-900 text-slate-50" : "text-slate-700"
        } font-light text-left border pl-2`}
      >
        {role}
      </TableCell>
    </TableRow>
  );
};
