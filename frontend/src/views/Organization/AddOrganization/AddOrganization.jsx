// REACT
import { useEffect, useState } from "react";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { GET_ORGANIZATIONS } from "../../../graphql/queries/organizationQueries";
import { ADD_ORGANIZATION } from "../../../graphql/mutations/organizationMutations";

// COMPONENTS
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicInput } from "../../../components/reusable/DynamicInput/DynamicInput";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../slices/usersApiSlice";

export const AddOrganization = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const { userInfo } = useSelector((state) => state.auth);

  const [organizationName, setOrganizationName] = useState("");
  const [userId, setUserId] = useState("");
  const [alertOn, setAlertOn] = useState(false);

  const { loading, error, data } = useQuery(GET_ORGANIZATIONS);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setUserId(userInfo._id);
  }, []);

  const [addOrganization] = useMutation(ADD_ORGANIZATION, {
    variables: {
      organizationName,
      userId,
    },
    update(cache, { data: { addOrganization } }) {
      const { organizations } = cache.readQuery({
        query: GET_ORGANIZATIONS,
        variables: { userId: userInfo._id },
      });
      cache.writeQuery({
        query: GET_ORGANIZATIONS,
        variables: { userId: userInfo._id },
        data: { organizations: [...organizations, addOrganization] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (organizationName === "") {
      setAlertOn(true);
      return (
        <div className="alert alert-danger" role="alert">
          Please provide an organization name!
        </div>
      );
    }

    addOrganization(organizationName, userId);

    setOrganizationName("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <div className={`${darkMode ? "bg-sky-800" : "bg-slate-50"} h-screen`}>
      <div className="w-3/5 mx-auto">
        {alertOn && (
          <div className="alert alert-danger mt-3" role="alert">
            Please provide a name for your organization.
          </div>
        )}
        <form className="mb-10" onSubmit={onSubmit}>
          <DynamicInput
            id="organization-name"
            inputType="input"
            type="text"
            label="Organization Name"
            placeholder="Name of your organization..."
            value={organizationName}
            changeHandler={(e) => setOrganizationName(e.target.value)}
            ariaLabel="Name of organization"
            className="py-5"
          />

          <DynamicButton color="red" type="submit">
            Submit
          </DynamicButton>
        </form>
      </div>
    </div>
  );
};
