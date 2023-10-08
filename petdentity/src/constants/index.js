import { cloneDeep } from "lodash";
import { getByUid } from "./../api/unit";

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
  name: cloneDeep(Name),
  address: cloneDeep(Address),
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
  profile: cloneDeep(Profile),
};

//Default PET
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

export const Vaccination = {
  pet: null, //PET
  veterinarian: null, //VET
};

export const Unit = {
  formType: null,
  unitType: null,
  status: null,
  uid: null,
  applicationDate: null,
  pet: null,
  owner: null,
  veterinarian: null,
  government: null,
};

export const Government = {
  name: null,
  email: null,
  mobile: null,
  level: null,
  privacy: null,
  photoUrl: null,
  address: cloneDeep(Address),
};
