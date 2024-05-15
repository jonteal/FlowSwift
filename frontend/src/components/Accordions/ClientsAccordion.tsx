import { Link } from "react-router-dom";

// COMPONENTS
import { ClientTable } from "../ClientTable/ClientTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../@/components/ui/accordion";

import { Accordion as BootstrapAccordion } from "react-bootstrap";

// STATE
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

// TYPES
import { ClientContainerType, ClientType } from "../../types/types";

export type ClientsAccordionProps = {
  clientCount: number;
  containerState: string;
  linkLabel?: string;
  link?: string;
  clients: ClientType[];
  container: ClientContainerType;
};

export const ClientsAccordion = ({
  clientCount,
  containerState,
  linkLabel,
  link,
  clients,
  container,
}: ClientsAccordionProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const [isExpanded, setIsExpanded] = useState(false);

  console.log("test");

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex flex-row items-center justify-between w-full">
              <p
                className={`${darkMode ? "text-slate-50" : "text-slate-900"} `}
              >
                ({clientCount}) {containerState}
              </p>
              {link && linkLabel && (
                <Link
                  className={`${
                    darkMode ? "text-slate-50" : "text-slate-900"
                  } mr-3`}
                  to={link}
                >
                  {linkLabel}
                </Link>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ClientTable
              key={container?.id}
              clientContainer={container}
              clients={clients}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
