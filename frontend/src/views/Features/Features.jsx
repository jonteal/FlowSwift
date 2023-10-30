import { useDispatch, useSelector } from "react-redux";
import {
  setNotificationsOff,
  setNotificationsOn,
} from "../../slices/featuresSlice";
import { FiltersList } from "../../components/reusable/FiltersList/FiltersList";

export const Features = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.features);

  const handleNotificationsToggle = () => {
    notifications
      ? dispatch(setNotificationsOff())
      : dispatch(setNotificationsOn());
  };

  const featureFlags = [
    {
      name: "Notifications",
      toggle: handleNotificationsToggle,
      value: notifications,
      isChecked: notifications,
    },
  ];
  return (
    <div className="border">
      <FiltersList filters={featureFlags} />
    </div>
  );
};
