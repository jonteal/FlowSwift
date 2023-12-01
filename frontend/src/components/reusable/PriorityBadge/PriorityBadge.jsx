import { useEffect, useState } from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { GiProgression } from "react-icons/gi";
import { BsCheckCircle } from "react-icons/bs";
import { camelCaseToWords } from "../../../utils/format";

export const PriorityBadge = ({ priority, position, className }) => {
  const [priorityColor, setPriorityColor] = useState("");

  useEffect(() => {
    if (priority === "low") {
      setPriorityColor("bg-sky-500");
    } else if (priority === "medium") {
      setPriorityColor("bg-green-600");
    } else if (priority === "high") {
      setPriorityColor("bg-orange-500");
    }
  }, [priority]);

  const priorityText = priority ? camelCaseToWords(priority) : "";

  const getPriorityIcon = (priority) => {
    if (priority === "low") {
      return <CiNoWaitingSign />;
    } else if (priority === "medium") {
      return <GiProgression />;
    } else if (priority === "high") {
      return <BsCheckCircle />;
    }
  };

  const getPosition = (position) => {
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
        className={`${priorityColor} rounded-lg flex flex-row items-center py-1 px-2`}
      >
        {/* <span className="text-slate-50 mx-1">{getPriorityIcon(priority)}</span> */}

        <p className={`text-center text-sm text-slate-50 mx-1`}>
          {priorityText}
        </p>
      </div>
    </div>
  );
};
