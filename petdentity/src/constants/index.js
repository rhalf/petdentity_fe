import _ from "lodash";

export const UserGroups = {
  ADMIN: "ADMIN",
  OWNER: "OWNER",
  VETERINARIAN: "VETERINARIAN",
  GOVERNMENT: "GOVERNMENT",
};

export const Statuses = {
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
  SUSPENDED: "SUSPENDED",
};

export const Privacies = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
};

export const PetStatuses = {
  NORMAL: "NORMAL",
  MISSING: "MISSING",
  FOUND: "FOUND",
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
  phoneNumber: null,
  headline: null,
};

//Default User
export const User = {
  id: null,
  email: null,
  emailVerified: null,
  mobileNumber: null,

  roles: [UserGroups.OWNER],
  status: Statuses.ENABLED,
  profile: _.cloneDeep(Profile),
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

//Default Government
// export const GOVERNMENT = {
//   name: null,
//   address: null,
// };
