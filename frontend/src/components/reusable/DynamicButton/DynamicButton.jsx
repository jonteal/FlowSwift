import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const DynamicButton = ({
  link,
  type,
  children,
  className,
  color,
  clickHandler,
}) => {
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
    case "lightBlue":
      color = "bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500";
    default:
      break;
  }
  // GET BUTTON
  const renderButton = (type) => {
    switch (type) {
      case "submit":
        return (
          <button
            onClick={clickHandler}
            className={`rounded px-4 py-2 overflow-hidden group ${color} relative hover:ring-2 hover:ring-offset-2 transition-all ease-out duration-300`}
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">{children}</span>
          </button>
        );
      case "add":
        return (
          <button
            onClick={clickHandler}
            className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
          >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              {children}
            </span>
          </button>
        );
      case "link":
        return (
          <Link
            to={link}
            className={`px-4 py-2 font-medium ${color} rounded-lg text-sm border`}
          >
            {children}
          </Link>
        );

      case "delete":
        return (
          <button
            onClick={clickHandler}
            className={`px-4 py-2 font-medium ${color} rounded-lg text-sm`}
          >
            {children}
          </button>
        );
      case "back":
        return (
          <button
            onClick={handleBackNavigate}
            className={`px-4 py-2 font-medium ${color} rounded-lg text-sm`}
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
