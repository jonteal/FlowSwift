import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../@/components/ui/alert";

export type DestructiveAlertProps = {
  title: string;
  description: string;
};

export const DestructiveAlert = ({
  title,
  description,
}: DestructiveAlertProps) => (
  <Alert variant="destructive">
    <ExclamationTriangleIcon className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </Alert>
);
