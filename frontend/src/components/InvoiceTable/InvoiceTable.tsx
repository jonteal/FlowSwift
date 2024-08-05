import { Link, useParams } from "react-router-dom";

// ICONS
import { TbFileInvoice } from "react-icons/tb";

// COMPONENTS
import { InvoiceTableItem } from "../dashboardBilling/InvoiceTableItem";
import { DynamicContainer } from "../reusable/DynamicContainer/DynamicContainer";

// STATE
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

// TYPES
import { InvoiceType } from "../../types/types";

export type InvoiceTableProps = {
  invoices: InvoiceType[];
  shortList?: boolean;
};

export const InvoiceTable = ({ invoices, shortList }: InvoiceTableProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const { clientId, projectId, organizationId } = useParams();

  const filteredList = shortList ? invoices : invoices.slice(0, 5);

  return (
    <DynamicContainer
      className={`${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } w-full rounded-xl mx-2 py-2 md:mt-0`}
    >
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row items-center mx-1">
          <TbFileInvoice className="ml-2 text-lg" />
          <h2
            className={`text-left ${
              darkMode ? "text-slate-50" : "text-slate-700"
            } text-lg mx-2`}
          >
            Invoices
          </h2>
        </div>
        <div className="flex flex-row justify-between py-2 px-2">
          <Link
            to={`/organizations/${organizationId}/clients/${clientId}/addInvoice`}
          >
            Add Invoice
          </Link>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="flex flex-row items-center justify-center px-5">
          <h2 className="mt-5 text-lg italic pb-4">
            {`You do not have any invoices for this ${
              projectId ? "project" : "client"
            } yet. To add an invoice, select a project and add invoice in Financials section`}
          </h2>
        </div>
      ) : (
        filteredList.map((invoice) => (
          <Link
            key={invoice.id}
            to={`/organizations/${organizationId}/clients/${clientId}/projects/${projectId}/financials/invoices/${invoice.id}`}
          >
            <InvoiceTableItem key={invoice.id} invoice={invoice} />
          </Link>
        ))
      )}
    </DynamicContainer>
  );
};
