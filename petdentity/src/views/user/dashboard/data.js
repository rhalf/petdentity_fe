import { USER_ROLES } from '@/data/structure'
const { PET_OWNER, VETERINARIAN, SYSTEM_ADMIN, LOCAL_GOVERNMENT } = USER_ROLES

export const dashboardItems = [
  {
    icon: 'mdi-card-account-details-star-outline',
    title: 'Pet Owner',
    height: 200,
    roles: [PET_OWNER],
    visible: true
  },
  {
    // icon: 'mdi-doctor',
    icon: 'mdi-stethoscope',
    title: 'Veterinarian Area',
    height: 200,
    roles: [VETERINARIAN],
    visible: true
  },
  {
    icon: 'mdi-shield-star',
    title: 'Local Government',
    height: 200,
    roles: [LOCAL_GOVERNMENT],
    visible: true
  },
  {
    icon: 'mdi-magnify',
    title: 'Pet Information',
    height: 200,
    roles: [PET_OWNER, VETERINARIAN, LOCAL_GOVERNMENT, SYSTEM_ADMIN],
    visible: true
  },
  {
    icon: 'mdi-paw',
    title: 'Missing and Found Pets',
    height: 200,
    roles: [PET_OWNER, VETERINARIAN, LOCAL_GOVERNMENT, SYSTEM_ADMIN],
    visible: false
  },
  {
    icon: 'mdi-needle',
    title: 'Pet Vaccination',
    height: 200,
    roles: [PET_OWNER, VETERINARIAN, LOCAL_GOVERNMENT, SYSTEM_ADMIN],
    visible: false
  },
  {
    icon: 'mdi-calendar',
    title: 'Upcoming Events',
    height: 200,
    roles: [PET_OWNER, VETERINARIAN, LOCAL_GOVERNMENT, SYSTEM_ADMIN],
    visible: false
  },
  {
    icon: 'mdi-cash',
    title: 'Points and Rewards',
    height: 200,
    roles: [PET_OWNER, VETERINARIAN, LOCAL_GOVERNMENT, SYSTEM_ADMIN],
    visible: false
  },
  {
    icon: 'mdi-account-network',
    title: 'Administrator',
    height: 200,
    roles: [SYSTEM_ADMIN],
    visible: true,
    to: { name: 'AdminDashboard' }
  }
]
