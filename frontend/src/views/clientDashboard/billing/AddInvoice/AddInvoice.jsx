import { useState } from "react";
import { useParams } from "react-router-dom";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_INVOICE } from "../../../../graphql/mutations/invoiceMutations";
import { GET_ALL_CLIENT_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_CLIENT_PROJECTS } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/DynamicButton/DynamicButton";
import { DynamicInput } from "../../../../components/reusable/DynamicInput/DynamicInput";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { DateSelector } from "../../../../components/reusable/DateSelector/DateSelector";

// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../../context";

export const AddInvoice = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { clientId } = useParams();

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [projectId, setProjectId] = useState("");

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_CLIENT_PROJECTS, { variables: { clientId } });

  const [addInvoice] = useMutation(ADD_INVOICE, {
    variables: {
      date,
      amount,
      notes,
      invoiceNumber,
      clientId,
      projectId,
    },
    update(cache, { data: { addInvoice } }) {
      const { clientInvoices } = cache.readQuery({
        query: GET_ALL_CLIENT_INVOICES,
        variables: { clientId },
      });
      cache.writeQuery({
        query: GET_ALL_CLIENT_INVOICES,
        variables: { clientId },
        data: { clientInvoices: [...clientInvoices, addInvoice] },
      });
    },
  });

  const handleDateChange = (date) => {
    setDate(date);
  };

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was an error loading the content</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      date === "" ||
      amount === "" ||
      invoiceNumber === "" ||
      projectId === ""
    ) {
      alert("Please fill in all fields");
    }

    addInvoice(date, amount, notes, invoiceNumber, projectId, clientId);

    setDate(new Date());
    setAmount("");
    setNotes("");
    setInvoiceNumber("");
    setProjectId("");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } flex flex-col items-center rounded-xl mx-2 mt-2 px-3`}
    >
      <h3 className="font-semibold text-lg mt-2">Add Invoice</h3>
      <div className="flex flex-row justify-between my-3 w-full px-4">
        <div className="flex flex-col w-full ml-2">
          <label
            className={`form-label block uppercase tracking-wide ${
              darkMode ? "text-slate-50" : "text-slate-700"
            }  text-xs font-bold mb-2`}
          >
            Project Name
          </label>
          <select
            className={`${
              darkMode
                ? "bg-sky-950 text-slate-50"
                : "bg-slate-50 text-slate-700"
            } form-select`}
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

      <form className="w-full max-w-lg mb-3" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <DateSelector
              className="mb-3"
              label="Date"
              date={date}
              dateChangeHandler={handleDateChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <DynamicInput
              id="invoice-number"
              inputType="input"
              type="text"
              label="Invoice Number"
              changeHandler={(e) => setInvoiceNumber(e.target.value)}
              placeholder="ex. M12345"
              value={invoiceNumber}
              ariaLabel="Invoice Number input"
            />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className={`form-label block uppercase tracking-wide ${
                darkMode ? "text-slate-50" : "text-slate-700"
              }  text-xs font-bold mb-2`}
              htmlFor="grid-invoice-amount"
            >
              Amount
            </label>
            <div className="flex flex-row items-center">
              <span className="mx-2 text-lg">$</span>
              <input
                className={`${
                  darkMode
                    ? "bg-sky-950 text-slate-50 border-gray-200 focus:bg-sky-950"
                    : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white"
                } appearance-none block w-full border rounded py-2 px-4 mb-3 leading-tight focus:outline-none`}
                id="grid-invoice-amount"
                min="0.01"
                step="0.01"
                type="number"
                placeholder="ex. 500"
                aria-label="Invoice Amount input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <DynamicInput
              id="invoice-notes"
              inputType="textarea"
              label="Notes"
              changeHandler={(e) => setNotes(e.target.value)}
              placeholder="Notes about this invoice"
              value={notes}
              rows="3"
              ariaLabel="Invoice notes section"
            />
          </div>
        </div>

        <DynamicButton color="red" type="submit">
          Submit
        </DynamicButton>
      </form>
    </div>
  );
};
