import { Link } from "react-router-dom";

// COMPONENTS
import { ProjectsTable } from "../ProjectsTable/ProjectsTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../@/components/ui/accordion";

// STATE
import { ProjectType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export type ProjectsAccordionProps = {
  linkLabel?: string;
  link?: string;
  projects: ProjectType[];
  searchTerm: string;
};

export const ProjectsAccordion = ({
  linkLabel,
  link,
  projects,
  searchTerm,
}: ProjectsAccordionProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const projectCount = projects.length;

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex flex-row items-center justify-between w-full">
              <p
                className={`${darkMode ? "text-slate-50" : "text-slate-900"} `}
              >
                ({projectCount})
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
            <ProjectsTable searchTerm={searchTerm} projects={projects} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
