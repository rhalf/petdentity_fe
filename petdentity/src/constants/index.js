import _ from "lodash";

export const UserRoles = {
  SYSTEM_ADMIN: "SYSTEM_ADMIN",
  PET_OWNER: "PET_OWNER",
  VETERINARIAN: "VETERINARIAN",
  LOCAL_GOVERNMENT: "LOCAL_GOVERNMENT",
};

export const Statuses = {
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
  SUSPENDED: "SUSPENDED",
};

// export const LEVEL = {
//   SUPER: "SUPER",
//   ADMIN: "ADMIN",
//   ENCODER: "ENCODER",
//   DEMO: "DEMO",
// };

// export const VACCINE = {
//   serial: null,
//   name: null,
//   description: null,
//   location: null,

//   applicationDate: null,
//   injectedDate: null,
//   effectivityDate: null,

//   verified: null,
//   verifiedBy: null,
// };

export const Address = {
  country: null,
  state: null,
  region: null,
  province: null,
  city: null,
  barangay: null,
  division: null,
  exact: null,
};

export const Name = {
  title: null,
  first: null,
  middle: null,
  last: null,
  suffix: null,
};

export const Profile = {
  name: _.cloneDeep(Name),
  address: _.cloneDeep(Address),
  gender: null,
  birthDate: null,
  photoUrl: null,
  // optional
};

// export const PET_OWNER = {
//   prcNumber: null,
// };
// export const VETERINARIAN = {
//   prcNumber: null,
// };
// export const LOCAL_GOVERNMENT = {
//   prcNumber: null,
// };
// export const SYSTEM_ADMIN = {
//   prcNumber: null,
// };

//Default User
export const User = {
  id: null,
  email: null,
  emailVerified: null,
  anonymous: null,

  roles: [UserRoles.PET_OWNER],
  status: Statuses.ENABLED,
  profile: _.cloneDeep(Profile),
};

// const ANIMAL = {
//   name: null,
//   scientific: null,
//   desc: null,
//   breed: [],
// };

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
