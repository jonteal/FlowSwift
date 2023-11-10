import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";
import { GET_USER } from "../../../graphql/queries/userQueries";
import { GET_ORGANIZATION } from "../../../graphql/queries/organizationQueries";

// COMPONENTS
import { ClientsContainer } from "../../../components/ClientsContainer/ClientsContainer";
import { Spinner } from "../../../components/reusable/Spinner/Spinner";
import { FiltersList } from "../../../components/reusable/FiltersList/FiltersList";
import { ChartContainer } from "../../../components/ChartContainer/ChartContainer";

import { FaUserAlt } from "react-icons/fa";

// STATE
import {
  setChartsOff,
  setChartsOn,
  setPieChartOff,
  setPieCharteOn,
  setBarChartOff,
  setBarChartOn,
  setLineChartOff,
  setLineChartOn,
} from "../../../slices/clientsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const ClientList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const dispatch = useDispatch();

  const { charts, pieChart, barChart, lineChart } = useSelector(
    (state) => state.clientsList
  );

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: userInfo._id },
  });

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS, {
    variables: { organizationId: userData?.user.organizationId },
  });

  const handleChartsToggle = () => {
    charts ? dispatch(setChartsOff()) : dispatch(setChartsOn());
  };

  const handlePieChartToggle = () => {
    pieChart ? dispatch(setPieChartOff()) : dispatch(setPieCharteOn());
  };

  const handleBarChartToggle = () => {
    barChart ? dispatch(setBarChartOff()) : dispatch(setBarChartOn());
  };

  const handleLineChartToggle = () => {
    lineChart ? dispatch(setLineChartOff()) : dispatch(setLineChartOn());
  };

  const handleOpenFilters = () => {
    setIsFilterOptionsOpen(!isFilterOptionsOpen);
  };

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>Something went wrong...</p>;

  const clientContainers = [
    {
      id: "lead",
      state: "Lead",
    },
    {
      id: "prospect",
      state: "Prospect",
    },
    {
      id: "current",
      state: "Current",
    },
    {
      id: "former",
      state: "Former",
    },
    {
      id: "cold",
      state: "Cold",
    },
  ];

  const clientListChartsFilters = [
    {
      name: "Charts",
      toggle: handleChartsToggle,
      value: charts,
      isChecked: charts,
      ariaLabel: "Charts filter",
    },
    {
      name: "Pie Chart",
      toggle: handlePieChartToggle,
      value: pieChart,
      isChecked: pieChart,
      ariaLabel: "Pie Chart filter",
    },
    {
      name: "Bar Chart",
      toggle: handleBarChartToggle,
      value: barChart,
      isChecked: barChart,
      ariaLabel: "Bar Chart filter",
    },
    {
      name: "Line Chart",
      toggle: handleLineChartToggle,
      value: lineChart,
      isChecked: lineChart,
      ariaLabel: "Line Chart filter",
    },
  ];

  return (
    <div className="overflow-x-scroll">
      <button
        className="border bg-sky-500 text-slate-50 px-4 py-1 mb-4 w-1/12 rounded-lg mt-3 mr-2"
        onClick={handleOpenFilters}
      >
        Filters
      </button>
      {isFilterOptionsOpen && <FiltersList filters={clientListChartsFilters} />}
      <div className="my-10">
        <ChartContainer chartData={clientData} />
      </div>

      <div className="flex flex-row">
        <FaUserAlt className="mr-5" />
        <h5 className="mb-3">Total Records ({clientData?.clients.length})</h5>
      </div>
      <ul className="overflow-x-scroll">
        {clientContainers.map((clientContainer) => (
          <ClientsContainer
            key={clientContainer.id}
            clientContainer={clientContainer}
            clientData={clientData}
          />
        ))}
      </ul>
    </div>
  );
};
