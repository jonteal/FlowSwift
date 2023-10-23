import ProgressBar from "react-bootstrap/ProgressBar";

export const ProgressBarComponent = ({ now }) => {
  // const now = 50;
  return <ProgressBar className="border w-5/6" now={now} label={`${now}%`} />;
};
