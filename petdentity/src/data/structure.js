export const USER_STATUS = {
  DISABLED: 'DISABLED',
  ENABLED: 'ENABLED',
  SUSPENDED: 'SUSPENDED'
}

export const USER_ROLES = {
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  PET_OWNER: 'PET_OWNER',
  VETERINARIAN: 'VETERINARIAN',
  LOCAL_GOVERNMENT: 'LOCAL_GOVERNMENT'
}

export const LEVEL = {
  SUPER: 'SUPER',
  ADMIN: 'ADMIN',
  ENCODER: 'ENCODER',
  DEMO: 'DEMO'
}

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
}

export const VACCINE = {
  serial: null,
  name: null,
  description: null,
  location: null,

  applicationDate: null,
  injectedDate: null,
  effectivityDate: null,

  verified: null,
  verifiedBy: null
}

export const ADDRESS = {
  country: null,
  state: null,
  region: null,
  province: null,
  city: null,
  barangay: null,
  subdivision: null,
  street: null
}

export const PROFILE = {
  address: ADDRESS,
  gender: null,
  birthDate: null,
  // optional

  veterinarian: {
    prcNumber: null
  },
  localGovernment: {
    prcNumber: null
  },
  systemAdmin: {
    level: null
  }
}

//Default User
export const USER = {
  roles: [USER_ROLES.PET_OWNER],
  status: USER_STATUS.ENABLED,
  profile: PROFILE
}

const ANIMAL = {
  name: null,
  scientific: null,
  desc: null,
  breed: []
}

//Default Beneficiary
export const PET = {
  name: null,
  animal: null,
  color: null,
  weight: null,
  height: null,
  gender: null,
  birthDate: null,
  vaccinations: [],
  photos: [],
  photo: []
}
