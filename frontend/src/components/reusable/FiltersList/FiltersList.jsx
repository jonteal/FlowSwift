// COMPONENTS
import { FilterToggle } from "../FilterToggle/FilterToggle";

// STATE
import { useSelector } from "react-redux";

export const FiltersList = ({ filters }) => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div
      className={`${
        darkMode ? "bg-sky-950 text-slate-100" : "bg-slate-200 text-slate-700"
      } border-slate-700 px-3 py-3 mx-2 my-2 rounded-lg flex flex-col md:flex-row justify-start`}
    >
      {filters.map((filter) => (
        <div key={filter.name}>
          <div className="flex flex-row mr-10">
            <p className="mr-3">{filter.name}</p>
            <FilterToggle
              value={filter.value}
              toggleHandler={filter.toggle}
              isChecked={filter.isChecked}
              ariaLabel={filter.ariaLabel}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
