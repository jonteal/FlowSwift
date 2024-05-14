// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SlOrganization } from "react-icons/sl";
import { OrganizationType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { Card, CardHeader } from "../../@/components/ui/card";

export const OrganizationCard = ({
  organization,
}: {
  organization: OrganizationType;
}) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const { organizationName, id } = organization;
  return (
    <Link to={`organizations/${id}/profile`}>
      <Card
        className={`border w-72 my-0 rounded-xl shadow-md p-3 mx-2 transform xl:translate-x-0 ease-in-out transition duration-500  ${
          darkMode
            ? "bg-sky-700 hover:bg-sky-600 transition ease-in-out delay-50 duration-200"
            : "bg-slate-50 hover:bg-slate-200 transition ease-in-out delay-50 duration-200"
        } flex flex-col items-center hover:scale-x-105 hover:scale-y-105 transition ease-in-out duration-200`}
      >
        <CardHeader className="flex flex-row items-center">
          <SlOrganization className="mr-2 text-sky-600" />
          <h2 className="my-2 font-bold">{organizationName}</h2>
        </CardHeader>
      </Card>
    </Link>
  );
};
