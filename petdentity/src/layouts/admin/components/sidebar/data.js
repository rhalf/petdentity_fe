export const items = [
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    subtitle: "Dashboard View",
    to: { name: "AdminDashboard" },
  },
  {
    icon: "mdi-paw",
    title: "Animals",
    subtitle: "Manage animals",
    to: { name: "AdminAnimalsSummary" },
  },
  {
    icon: "mdi-sheep",
    title: "Coats",
    subtitle: "Manage coats",
    to: { name: "AdminCoatsSummary" },
  },
  {
    icon: "mdi-access-point",
    title: "Units",
    subtitle: "Manage Units",
    children: [
      {
        icon: "mdi-format-list-bulleted",
        title: "Summary",
        subtitle: "Manage Units",
        to: { name: "AdminUnitsSummary" },
      },
      {
        icon: "mdi-package-up",
        title: "Bulk Upload",
        subtitle: "Multiple Registration",
        to: { name: "AdminUnitsBulkUpload" },
      },
    ],
  },
  {
    icon: "mdi-account-multiple",
    title: "Users",
    subtitle: "Manage Users",
    to: { name: "AdminUsersSummary" },
  },
  {
    icon: "mdi-shield-star",
    title: "Government",
    subtitle: "Manage Government",
    to: { name: "AdminGovernmentsSummary" },
  },
];
