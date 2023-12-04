import { ReactNode } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export type DynamicButtonProps = {
  link: string;
  type: string;
  children: ReactNode;
  className: string;
  color: string;
  clickHandler: () => void;
  disabled: boolean
}

export const DynamicButton = ({
  link,
  type,
  children,
  className,
  color,
  clickHandler,
  disabled,
}: DynamicButtonProps) => {
  const navigate = useNavigate();
  const handleBackNavigate = () => {
    navigate(-1);
  };

  switch (color) {
    case "red":
      color = "bg-red-500 hover:bg-red-400 text-white hover:text-slate-50";
      break;
    case "green":
      color =
        "bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400 hover:bg-gradient-to-r";
        break;
    case "lightBlue":
      color = "bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500";
      break;
    case "blue":
      color = "bg-blue-500 hover:bg-blue-100 hover:text-blue-600 text-blue-50";
      break;
    default:
      break;
  }
  // GET BUTTON
  const renderButton = (type: string) => {
    switch (type) {
      case "submit":
        return (
          <button
            disabled={disabled}
            onClick={clickHandler}
            className={`rounded px-4 py-2 overflow-hidden group ${color} relative hover:ring-2 hover:ring-offset-2 transition-all ease-out duration-300`}
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">{children}</span>
          </button>
        );
      case "primary":
        return (
          <button
            className={`border px-3 py-2 ${className} font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm`}
          >
            {children}
          </button>
        );
      case "link":
        return (
          <Link
            to={link}
            className={`border px-3 py-2 ${className} font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm`}
          >
            {children}
          </Link>
        );

      case "delete":
        return (
          <button
            disabled={disabled}
            onClick={clickHandler}
            className={`px-4 py-2 font-medium ${color} rounded-lg text-sm`}
          >
            {children}
          </button>
        );
      case "back":
        return (
          <button
            disabled={disabled}
            onClick={handleBackNavigate}
            className={`border px-3 py-2 ${className} font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm`}
          >
            <div className="flex flex-row items-center">
              <FaRegArrowAltCircleLeft className="mr-2" />
              {children}
            </div>
          </button>
        );

      default:
        break;
    }
  };
  return <div className={className}>{renderButton(type)}</div>;
};
