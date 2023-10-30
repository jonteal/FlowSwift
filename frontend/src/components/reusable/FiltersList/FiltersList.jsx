import { FilterToggle } from "../FilterToggle/FilterToggle";

export const FiltersList = ({ filters }) => (
  <div className="border-slate-700 bg-slate-50 px-3 py-3 mx-2 my-2 rounded-lg">
    <ul>
      {filters.map((filter) => (
        <li key={filter.name}>
          <div className="flex flex-row">
            <p className="mr-3">{filter.name}</p>
            <FilterToggle
              value={filter.value}
              toggleHandler={filter.toggle}
              isChecked={filter.isChecked}
              ariaLabel={filter.ariaLabel}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);
