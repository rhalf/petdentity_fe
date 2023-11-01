import { cloneDeep } from "lodash";

export const UserGroups = Object.freeze({
  SUPER: "SUPER",
  ADMIN: "ADMIN",
  OWNER: "OWNER",
  VETERINARIAN: "VETERINARIAN",
  GOVERNMENT: "GOVERNMENT",
});

export const Statuses = Object.freeze({
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
  SUSPENDED: "SUSPENDED",
});

export const Privacies = Object.freeze({
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
});

export const PetStatuses = Object.freeze({
  NORMAL: "NORMAL",
  MISSING: "MISSING",
  FOUND: "FOUND",
});

export const Address = Object.freeze({
  country: null,
  state: null,
  region: null,
  province: null,
  city: null,
  barangay: null,
  division: null,
  exact: null,
});

export const Name = Object.freeze({
  title: null,
  first: null,
  middle: null,
  last: null,
  suffix: null,
});

export const Profile = Object.freeze({
  name: cloneDeep(Name),
  address: cloneDeep(Address),
  gender: null,
  birthDate: null,
  photoUrl: null,
  phoneNumber: null,
  headline: null,
});

//Default User
export const User = Object.freeze({
  id: null,
  email: null,
  emailVerified: null,
  mobileNumber: null,

  roles: [UserGroups.OWNER],
  status: Statuses.ENABLED,
  profile: cloneDeep(Profile),
});

//Default PET
export const PET = Object.freeze({
  name: null,
  birthDate: null,

  weight: null,
  height: null,

  animal: null,
  type: null,
  breed: null,
  gender: null,
  coat: null,
  coatRemarks: [],

  privacy: null,
  status: null,
});

export const Vaccine = Object.freeze({
  serialNumber: null,
  lotNumber: null,
  applicationDate: null,
  validityDate: null,
  boosterDate: null,
  veterinarian: null,
  prcNumber: null,
  ptcNumber: null,
  pet: null,
});

export const Unit = Object.freeze({
  uid: null,
  unitType: null,
  formType: null,
  status: null,
  applicationDate: null,
  pet: null,
  owner: null,
  veterinarian: null,
  government: null,
});

export const Government = Object.freeze({
  name: null,
  email: null,
  mobile: null,
  level: null,
  privacy: null,
  photoUrl: null,
  address: cloneDeep(Address),
  users: [],
});

export const Animal = Object.freeze({
  name: null,
  type: null,
});

export const Breed = Object.freeze({
  name: null,
  type: null,
  animal: null,
});

export const Contact = Object.freeze({
  name: null,
  mobile: null,
  address: cloneDeep(Address),
});

export const Coat = Object.freeze({
  name: null,
});

export const Pet = Object.freeze({
  name: null,
  animal: null,
  birthDate: null,
  breed: null,
  coat: null,
  coatRemarks: null,
  gender: null,
  photoUrl: null,
  height: null,
  weight: null,
  petStatus: null,
  photoUrl: null,
  owner: null,
  privacy: null,
});

export const Partner = Object.freeze({
  name: null,
  link: null,
  privacy: null,
});
