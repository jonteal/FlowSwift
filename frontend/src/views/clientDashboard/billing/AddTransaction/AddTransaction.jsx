import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_TRANSACTION } from "../../../../graphql/mutations/transactionMutations";
import { GET_ALL_CLIENT_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";
import { GET_CLIENT_PROJECTS } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import { Button } from "../../../../@/components/ui/button";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DateSelector } from "../../../../components/reusable/DateSelector/DateSelector";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { DynamicContainer } from "../../../../components/reusable/DynamicContainer/DynamicContainer";
import { PageHeadline } from "../../../../components/reusable/PageHeadline/PageHeadline";

// STATE
import { useState } from "react";
import { useSelector } from "react-redux";

export const AddTransaction = () => {
  const { darkMode } = useSelector((state) => state.theme);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { clientId } = useParams();

  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentParty, setPaymentParty] = useState("");
  const [incomingOutgoing, setIncomingOutgoing] = useState("outgoing");
  const [projectId, setProjectId] = useState("");

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_CLIENT_PROJECTS, { variables: { clientId } });

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    variables: {
      paymentDate,
      amount,
      paymentParty,
      incomingOutgoing,
      clientId,
      projectId,
    },
    update(cache, { data: { addTransaction } }) {
      const { clientTransactions } = cache.readQuery({
        query: GET_ALL_CLIENT_TRANSACTIONS,
        variables: { clientId },
      });
      cache.writeQuery({
        query: GET_ALL_CLIENT_TRANSACTIONS,
        variables: { clientId },
        data: { clientTransactions: [...clientTransactions, addTransaction] },
      });
    },
  });

  const handleDateChange = (date) => {
    setPaymentDate(date);
  };

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was an error loading the content</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      paymentDate === "" ||
      amount === "" ||
      paymentParty === "" ||
      projectId === ""
    ) {
      alert("Please fill in all fields");
    }

    addTransaction(
      paymentDate,
      amount,
      paymentParty,
      incomingOutgoing,
      clientId,
      projectId
    );

    setPaymentDate(new Date());
    setAmount("");
    setPaymentParty("");
    setIncomingOutgoing("outgoing");
    setProjectId("");
  };

  const transactionTypeOptions = [
    {
      label: "Incoming",
      value: "incoming",
      ariaLabel: "Incoming transaction",
    },
    {
      label: "Outgoing",
      value: "outgoing",
      ariaLabel: "Outgoing transaction",
    },
  ];

  return (
    <DynamicContainer>
      <PageHeadline>Add Transaction</PageHeadline>

      <div className="flex flex-row justify-between my-3 w-full px-4">
        <div className="flex flex-col w-full ml-2">
          <label
            className={`block uppercase tracking-wide ${
              darkMode ? "text-slate-50" : "text-gray-700"
            } text-xs font-bold mb-2 mt-3`}
          >
            Project Name
          </label>
          <select
            className="form-select"
            aria-label="Select Project"
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projectsData.clientProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" {...register("paymentDate")} />
        <input type="text" {...register("paymentParty")} />
        <input type="text" {...register("amount")} />
        <select {...register("incomingOutgoing")}>
          <option value="incoming">Incoming</option>
          <option value="outgoing">Outgoing</option>
        </select>
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        <Button type="submit">Save</Button>
      </form>

      <form className="w-full max-w-lg pb-3" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <DateSelector
              className="mb-3"
              label="Date"
              date={paymentDate}
              dateChangeHandler={handleDateChange}
            />
          </div>
          <DynamicInput
            id="payment-party"
            inputType="input"
            type="text"
            label="Payment Party"
            changeHandler={(e) => setPaymentParty(e.target.value)}
            placeholder="ex. Squarespace"
            value={paymentParty}
            ariaLabel="Payment party input"
            className="w-full md:w-5/12 px-2 mx-3"
          />
        </div>
        <div className="w-full px-2 mb-6 flex flex-row">
          <DynamicInput
            id="transaction-amount"
            inputType="input"
            type="number"
            label="Amount"
            changeHandler={(e) => setAmount(e.target.value)}
            placeholder="ex. 500"
            value={amount}
            ariaLabel="Transaction Amount input"
            className="flex flex-col w-full md:w-1/2"
          />

          <div className="flex flex-col w-1/2 mx-2">
            <DynamicInput
              id="transaction-type"
              changeHandler={(e) => setIncomingOutgoing(e.target.value)}
              value={incomingOutgoing}
              ariaLabel="Transaction type select"
              selectOptions={transactionTypeOptions}
            />

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

        <Button type="submit">Submit</Button>
      </form>
    </DynamicContainer>
  );
};
