import { useState } from "react";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";

// COMPONENTS
import { Spinner } from "../../components/reusable/Spinner/Spinner";
import { DynamicButton } from "../../components/reusable/DynamicButton/DynamicButton";
import { ProjectPageCard } from "../../components/ProjectPageCard/ProjectPageCard";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../context";

export const Projects = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the comment feed</p>;

  return (
    <div className={`flex flex-col max-h-screen ${darkMode ? "" : ""}`}>
      <DynamicButton
        color="red"
        type="link"
        link="/addProject"
        className="mx-2 mt-4"
      >
        Add Project
      </DynamicButton>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => setSearchTerm(event.target.value)}
        className="searchBar w-40 border rounded-xl pl-3 py-1 ml-5"
      />

      <p
        className={`block uppercase tracking-wide ${
          darkMode ? "text-sky-100" : "text-slate-700"
        }  text-base font-bold mb-2`}
      >
        Total Projects: {data.projects.length}
      </p>

      <div className="flex flex-row flex-wrap mx-auto">
        {data.projects
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val?.client.firstName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val?.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val?.client.lastName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((project) => (
            <ProjectPageCard key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
};
