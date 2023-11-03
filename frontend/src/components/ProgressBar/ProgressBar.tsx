import ProgressBar from "react-bootstrap/ProgressBar";

type ProgressBarComponentProps = {
  now: number
}

export const ProgressBarComponent = ({ now }: ProgressBarComponentProps) => {
  // const now = 50;
  return <ProgressBar className="border w-5/6" now={now} label={`${now}%`} />;
};
