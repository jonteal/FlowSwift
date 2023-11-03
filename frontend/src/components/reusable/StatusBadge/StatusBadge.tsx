import { useEffect, useState } from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { GiProgression } from "react-icons/gi";
import { BsCheckCircle } from "react-icons/bs";
import { PiPauseDuotone } from "react-icons/pi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { camelCaseToWords } from "../../../utils/format";

export type StatusBadgeProps = {
  status: string,
  position: string,
  className: string
}

export const StatusBadge = ({ status, position, className }: StatusBadgeProps) => {
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (status === "notStarted") {
      setStatusColor("bg-yellow-500");
    } else if (status === "inProgress") {
      setStatusColor("bg-green-600");
    } else if (status === "completed") {
      setStatusColor("bg-sky-600");
    } else if (status === "paused") {
      setStatusColor("bg-red-600");
    } else if (status === "needsAttention") {
      setStatusColor("bg-orange-500");
    }
  }, [status]);

  const statusText = camelCaseToWords(status);

  const getStatusIcon = (status: string) => {
    if (status === "notStarted") {
      return <CiNoWaitingSign />;
    } else if (status === "inProgress") {
      return <GiProgression />;
    } else if (status === "completed") {
      return <BsCheckCircle />;
    } else if (status === "paused") {
      return <PiPauseDuotone />;
    } else {
      return <AiOutlineExclamationCircle />;
    }
  };

  const getPosition = (position: string) => {
    switch (position) {
      case "left":
        position = "justify-start";
      case "center":
        position = "justify-center";
      case "right":
        position = "justify-end";
      default:
        break;
    }
  };

  return (
    <div
      className={`flex flex-row w-full ${getPosition(position)} ${className}`}
    >
      <div
        className={`${statusColor} rounded-lg flex flex-row items-center py-1 px-2`}
      >
        <span className="text-slate-50 mx-1">{getStatusIcon(status)}</span>

        <p className={`text-center text-sm text-slate-50 mx-1`}>{statusText}</p>
      </div>
    </div>
  );
};
