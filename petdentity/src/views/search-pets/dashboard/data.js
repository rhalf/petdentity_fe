import { UserGroups } from "@/constants";
const { OWNER, VETERINARIAN, ADMIN, GOVERNMENT } = UserGroups;

export const dashboardItems = [
  {
    icon: "mdi-card-account-details-star-outline",
    title: "Pet Owner",
    height: 200,
    roles: [OWNER],
    visible: true,
  },
  {
    // icon: 'mdi-doctor',
    icon: "mdi-stethoscope",
    title: "Veterinarian Area",
    height: 200,
    roles: [VETERINARIAN],
    visible: true,
  },
  {
    icon: "mdi-shield-star",
    title: "Local Government",
    height: 200,
    roles: [GOVERNMENT],
    visible: true,
  },
  {
    icon: "mdi-magnify",
    title: "Pet Information",
    height: 200,
    roles: [OWNER, VETERINARIAN, GOVERNMENT, ADMIN],
    visible: true,
  },
  {
    icon: "mdi-paw",
    title: "Missing and Found Pets",
    height: 200,
    roles: [OWNER, VETERINARIAN, GOVERNMENT, ADMIN],
    visible: false,
  },
  {
    icon: "mdi-needle",
    title: "Pet Vaccination",
    height: 200,
    roles: [OWNER, VETERINARIAN, GOVERNMENT, ADMIN],
    visible: false,
  },
  {
    icon: "mdi-calendar",
    title: "Upcoming Events",
    height: 200,
    roles: [OWNER, VETERINARIAN, GOVERNMENT, ADMIN],
    visible: false,
  },
  {
    icon: "mdi-cash",
    title: "Points and Rewards",
    height: 200,
    roles: [OWNER, VETERINARIAN, GOVERNMENT, ADMIN],
    visible: false,
  },
  {
    icon: "mdi-account-network",
    title: "Administrator",
    height: 200,
    roles: [ADMIN],
    visible: true,
    to: { name: AdminDashboard },
  },
];
