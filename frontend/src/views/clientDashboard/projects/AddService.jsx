// REACT
import { useState } from "react";
import { useParams } from "react-router-dom";

// APOLLO
import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_SERVICE } from "../../../graphql/mutations/serviceMutations";
import { GET_SERVICES } from "../../../graphql/queries/serviceQueries";

// COMPONENTS
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { DateSelector } from "../../../components/reusable/DateSelector/DateSelector";
import { Checkbox } from "../../../components/reusable/Checkbox/Checkbox";
import { DynamicInput } from "../../../components/reusable/DynamicInput/DynamicInput";
import { DynamicContainer } from "../../../components/reusable/DynamicContainer/DynamicContainer";

// STATE
import { useSelector } from "react-redux";

export const AddService = () => {
  const { darkMode } = useSelector((state) => state.theme);

  const { projectId } = useParams();

  const [service, setService] = useState("");
  const [cost, setCost] = useState("");
  const [status, setStatus] = useState("off");
  const [notes, setNotes] = useState("");
  const [paymentSchedule, setPaymentSchedule] = useState("monthly");
  const [serviceProvider, setServiceProvider] = useState("inHouse");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [alertOn, setAlertOn] = useState(false);
  const [hasEndDate, setHasEndDate] = useState(false);

  const [addService] = useMutation(ADD_SERVICE, {
    variables: {
      service,
      cost,
      notes,
      paymentSchedule,
      serviceProvider,
      projectId,
      status,
      startDate,
      endDate,
    },
    update(cache, { data: { addService } }) {
      const { services } = cache.readQuery({
        query: GET_SERVICES,
        variables: { projectId },
      });
      cache.writeQuery({
        query: GET_SERVICES,
        variables: { projectId },
        data: { services: [...services, addService] },
      });
    },
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (service === "" || cost === "" || status === "") {
      setAlertOn(true);
      return (
        <div className="alert alert-danger" role="alert">
          Please provide a service name, cost, and status!
        </div>
      );
    }

    addService(
      service,
      cost,
      projectId,
      notes,
      serviceProvider,
      status,
      startDate,
      endDate
    );

    setService("");
    setCost("");
    setPaymentSchedule("monthly");
    setNotes("");
    setServiceProvider("inHouse");
    setStatus("off");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <DynamicContainer className="mt-2">
      <div>
        {alertOn && (
          <div className="alert alert-danger mt-3" role="alert">
            Please provide a title, description, and status!
          </div>
        )}

        <h1
          className={`${
            darkMode ? "text-slate=50" : "text-gray-700 "
          } block uppercase tracking-wide text-lg font-bold mt-2 mb-3 pt-3`}
        >
          Add Service
        </h1>

        <div className="flex flex-row items-end">
          <div className="flex flex-col justify-center w-full">
            <div className="flex flex-row">
              <DynamicInput
                id="service-status"
                inputType="select"
                label="Service Status"
                changeHandler={(e) => setStatus(e.target.value)}
                value={status}
                selectOptions={[
                  { value: "off", label: "Off" },
                  { value: "on", label: "On" },
                ]}
                className="w-full mx-2"
                ariaLabel="Service status"
              />

              <DynamicInput
                id="service-provider"
                inputType="select"
                label="In House / Third Party"
                changeHandler={(e) => setServiceProvider(e.target.value)}
                value={serviceProvider}
                selectOptions={[
                  { value: "inHouse", label: "In House" },
                  { value: "thirdParty", label: "Third Party" },
                ]}
                className="w-full mx-2"
                ariaLabel="In House or Third Party select"
              />
            </div>

            <DynamicInput
              id="service-payment-schedule"
              inputType="select"
              label="Payment Schedule"
              changeHandler={(e) => setPaymentSchedule(e.target.value)}
              value={paymentSchedule}
              selectOptions={[
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
                { value: "perInstance", label: "Per Instance" },
              ]}
              className="w-full mt-5 mx-2"
              ariaLabel="Payment Schedule select"
            />
          </div>
        </div>

        <form className="w-full mt-3" onSubmit={onSubmit}>
          <div className="flex flex-row mb-6 mt-5">
            <DynamicInput
              id="service-name"
              inputType="input"
              type="text"
              label="Service"
              changeHandler={(e) => setService(e.target.value)}
              placeholder="Ex. Squarespace"
              value={service}
              className="w-full mb-6 mx-2 md:mb-0"
              ariaLabel="Service name input"
            />

            <DynamicInput
              id="service-cost"
              inputType="input"
              type="number"
              label="Cost"
              changeHandler={(e) => setCost(e.target.value)}
              placeholder="ex. 200"
              value={cost}
              className="w-full mx-2"
              ariaLabel="Invoice Amount input"
              step="0.01"
              min="0.01"
            />
          </div>

          <DynamicInput
            id="service-notes"
            inputType="textarea"
            label="Notes"
            changeHandler={(e) => setNotes(e.target.value)}
            placeholder="Notes about this invoice"
            value={notes}
            className="w-full mt-5 mx-2"
            rows="3"
            ariaLabel="Service notes section"
          />

          <div className="flex flex-row my-5 items-center justify-start">
            <DateSelector
              className="mb-3"
              label="Start Date"
              date={startDate}
              dateChangeHandler={handleStartDateChange}
            />

            <div className="flex flex-row">
              <Checkbox
                label="Does this service have an end date?"
                value={hasEndDate}
                setChangeHandler={() => setHasEndDate(!hasEndDate)}
              />

              {hasEndDate && (
                <DateSelector
                  className="mb-3"
                  label="End Date"
                  date={endDate}
                  dateChangeHandler={handleEndDateChange}
                />
              )}
            </div>
          </div>

          <DynamicButton className="mb-10 pb-10" color="red" type="submit">
            Submit
          </DynamicButton>
        </form>
      </div>
    </DynamicContainer>
  );
};
