export const USER_STATUS = {
    DISABLED,
    ENABLED,
    SUSPENDED,
}

export const USER_ROLES = {
    SYSTEM_ADMIN,
    PET_OWNER,
    VETERINARIAN,
    LOCAL_GOVERNMENT
}

//Default User
export const USER = {
    roles: [USER_ROLES.PET_OWNER],
    status: USER_STATUS.ENABLED,

    profile: null, 

    systemAdmin: null,
    petOwner: null,
    veterinary: null,
    localGovernment: null,
}


const ANIMAL = {
    name: null,
    scientific: null,
    desc: null
}

//Default Beneficiary
export const PET = {
    name: null,
    animal: null,
    color: null,
    weight: null,
    height: null,
    gender: null,
    birthDate: null
} 