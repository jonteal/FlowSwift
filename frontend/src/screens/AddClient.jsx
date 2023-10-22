import { useEffect, useState } from "react";

// LIBRARIES
import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_CLIENT } from "../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../graphql/queries/clientQueries";
import { useSelector } from "react-redux";

// COMPONENTS
// import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";

export const AddClient = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("prospect");
  const [userId, setUserId] = useState(userInfo._id);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status,
      userId,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "") {
      alert("Please fill in the client name");
    }

    addClient(
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status
    );

    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmailAddress("");
    setCompanyName("");
    setStatus("prospect");
  };

  return (
    <>
      <h1>Add Client</h1>
      <div className="flex flex-col items-center">
        <h3 className="font-semibold text-slate-800 text-lg my-3">
          Add Client
        </h3>

        <form className="w-full max-w-lg" onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                aria-label="First name input"
                type="text"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                aria-label="Last name input"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phone-number"
              >
                Phone Number
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-phone-number"
                type="text"
                placeholder="479-523-1234"
                aria-label="Phone Number input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email-address"
              >
                Email Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email-address"
                type="text"
                placeholder="jane@gmail.com"
                aria-label="Email Address input"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-company"
              >
                Company Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-company"
                aria-label="Company Name input"
                type="text"
                placeholder="Jane's Cafe"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <p className="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Status
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  aria-label="Client Status select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option aria-label="Lead" value="lead">
                    Lead
                  </option>
                  <option aria-label="Prospect" value="prospect">
                    Prospect
                  </option>
                  <option aria-label="Current Client" value="current">
                    Current
                  </option>
                  <option aria-label="Former Client" value="former">
                    Former
                  </option>
                  <option aria-label="Cold Lead" value="cold">
                    Cold
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};
