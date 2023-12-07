import ProgressBar from "react-bootstrap/ProgressBar";

export type ProgressBarComponentProps = {
  now: number
}

export const ProgressBarComponent = ({ now }: ProgressBarComponentProps) => <ProgressBar className="border w-5/6" now={now} label={`${now}%`} />;

