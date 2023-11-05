export const projectCardFilters = [
  {
    name: "Status Badge",
    toggle: handleStatusBadgeToggle,
    value: statusBadge,
    isChecked: statusBadge,
    ariaLabel: "Status Badge filter",
  },
  {
    name: "Client Name",
    toggle: handleClientNameToggle,
    value: clientName,
    isChecked: clientName,
    ariaLabel: "Client Name filter",
  },
];
