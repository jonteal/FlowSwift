// REACT
import { useEffect, useState } from "react";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { GET_USER } from "../../graphql/queries/userQueries";
import { GET_ORGANIZATIONS } from "../../graphql/queries/organizationQueries";
import { ADD_ORGANIZATION } from "../../graphql/mutations/organizationMutations";

// COMPONENTS
import { Button } from "../../@/components/ui/button";
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { DynamicInput } from "../../components/reusable/DynamicInput/DynamicInput";

// STATE
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { Label } from "../../@/components/ui/label";
import { Input } from "../../@/components/ui/input";
import { DestructiveAlert } from "../../components/reusable/Alerts/DestructiveAlert";

export const AddOrganization = () => {
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.theme);

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
    onCompleted: () => navigate(`/`),
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
        <DestructiveAlert
          title=""
          description="Please provide a name for your organization"
        />
      );
    }

    addOrganization(organizationName, userId);

    setOrganizationName("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <div className="bg-slate-50 h-screen">
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

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};
