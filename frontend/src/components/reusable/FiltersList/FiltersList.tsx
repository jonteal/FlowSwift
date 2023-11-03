import { FilterToggle } from "../FilterToggle/FilterToggle";

export type FiltersType = {
  name: string,
  toggle: () => void,
  value: string,
  isChecked: boolean,
  ariaLabel: string,
}

type FiltersListProps = {
  filters: FiltersType[]
}

export const FiltersList = ({ filters }: FiltersListProps) => (
  <div className="border-slate-700 bg-slate-200 px-3 py-3 mx-2 my-2 rounded-lg flex flex-row justify-start">
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
