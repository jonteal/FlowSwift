import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_MEMBER } from "../../../graphql/mutations/memberMutations";
import { GET_MEMBERS } from "../../../graphql/queries/memberQueries";

// COMPONENTS
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";

// STATE
import { useContext, useState } from "react";
import { ThemeContext } from "../../../context";

export const Signup = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [addMember] = useMutation(ADD_MEMBER, {
    variables: {
      username,
      emailAddress,
      companyName,
      password,
    },
    update(cache, { data: { addMember } }) {
      const { members } = cache.readQuery({ query: GET_MEMBERS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { members: [...members, addMember] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "" || emailAddress === "" || password === "") {
      alert("Please fill in a username, email address, and password");
    }

    addMember(username, emailAddress, companyName, password);

    setUsername("");
    setEmailAddress("");
    setCompanyName("");
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <form onSubmit={onSubmit}>
        <label
          className={`block uppercase tracking-wide ${
            darkMode ? "text-slate-50" : "text-gray-700"
          }  text-xs font-bold py-3`}
          htmlFor="username-input"
        >
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username-input"
          type="text"
          placeholder="Username"
          className={`block rounded-md tracking-wide ${
            darkMode ? "text-slate-700" : "text-slate-700 border"
          }  text-base font-semibold py-2 px-3`}
        />
        <label
          className={`block uppercase tracking-wide ${
            darkMode ? "text-slate-50" : "text-gray-700"
          }  text-xs font-bold py-3`}
          htmlFor="email-input"
        >
          Email
        </label>
        <input
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          id="email-input"
          type="text"
          placeholder="Email"
          className={`block rounded-md tracking-wide ${
            darkMode ? "text-slate-700" : "text-slate-700 border"
          }  text-base font-semibold py-2 px-3`}
        />
        <label
          className={`block uppercase tracking-wide ${
            darkMode ? "text-slate-50" : "text-gray-700"
          }  text-xs font-bold py-3`}
          htmlFor="password-input"
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password-input"
          type="password"
          placeholder="Password"
          className={`block rounded-md tracking-wide ${
            darkMode ? "text-slate-700" : "text-slate-700 border"
          }  text-base font-semibold py-2 px-3`}
        />

        <label
          className={`block uppercase tracking-wide ${
            darkMode ? "text-slate-50" : "text-gray-700"
          }  text-xs font-bold py-3`}
          htmlFor="username-input"
        >
          Company Name
        </label>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          id="company-input"
          type="text"
          placeholder="Company Name"
          className={`block rounded-md tracking-wide ${
            darkMode ? "text-slate-700" : "text-slate-700 border"
          }  text-base font-semibold py-2 px-3`}
        />
        <DynamicButton className="mt-5" color="red" type="submit">
          Signup
        </DynamicButton>
      </form>
    </div>
  );
};
