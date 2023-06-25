import _ from "lodash";

export const USER_STATUS = {
  DISABLED: "DISABLED",
  ENABLED: "ENABLED",
  SUSPENDED: "SUSPENDED",
};

export const UserRoles = {
  SYSTEM_ADMIN: "SYSTEM_ADMIN",
  PET_OWNER: "PET_OWNER",
  VETERINARIAN: "VETERINARIAN",
  LOCAL_GOVERNMENT: "LOCAL_GOVERNMENT",
};

export const LEVEL = {
  SUPER: "SUPER",
  ADMIN: "ADMIN",
  ENCODER: "ENCODER",
  DEMO: "DEMO",
};

export const GENDER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
};

export const VACCINE = {
  serial: null,
  name: null,
  description: null,
  location: null,

  applicationDate: null,
  injectedDate: null,
  effectivityDate: null,

  verified: null,
  verifiedBy: null,
};

export const ADDRESS = {
  country: null,
  state: null,
  region: null,
  province: null,
  city: null,
  barangay: null,
  division: null,
  exact: null,
};

export const NAME = {
  title: null,
  first: null,
  middle: null,
  last: null,
  suffix: null,
};

export const PROFILE = {
  name: _.cloneDeep(NAME),
  address: _.cloneDeep(ADDRESS),
  gender: null,
  birthDate: null,
  photoUrl: null,
  // optional
};

export const PET_OWNER = {
  prcNumber: null,
};
export const VETERINARIAN = {
  prcNumber: null,
};
export const LOCAL_GOVERNMENT = {
  prcNumber: null,
};
export const SYSTEM_ADMIN = {
  prcNumber: null,
};

//Default User
export const USER = {
  id: null,
  email: null,
  emailVerified: null,
  anonymous: null,

  roles: [UserRoles.PET_OWNER],
  status: USER_STATUS.ENABLED,
  profile: PROFILE,
};

const ANIMAL = {
  name: null,
  scientific: null,
  desc: null,
  breed: [],
};

//Default Beneficiary
export const PET = {
  name: null,
  animal: null,
  color: null,
  weight: null,
  height: null,
  gender: null,
  birthDate: null,

  photos: [],
  photo: [],
};

export const VACCINATION = {
  pet: null, //PET
  veterinarian: null, //VET
};
