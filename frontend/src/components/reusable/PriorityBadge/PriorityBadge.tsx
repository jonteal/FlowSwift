import { useEffect, useState } from "react";
import { camelCaseToWords } from "../../../utils/format";

export type PriorityBadgeProps = {
  priority: 'low' | 'medium' | 'high',
  position: string,
  className: string
}

export const PriorityBadge = ({ priority, position, className }: PriorityBadgeProps) => {
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

  const getPosition = (position: string) => {
    switch (position) {
      case "left":
        position = "justify-start";
        break;
      case "center":
        position = "justify-center";
        break;
      case "right":
        position = "justify-end";
        break;
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
        <p className={`text-center text-sm text-slate-50 mx-1`}>
          {priorityText}
        </p>
      </div>
    </div>
  );
};
