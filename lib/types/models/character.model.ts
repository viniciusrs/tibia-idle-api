export interface Character {
    id: String,
    userId: String,
    name: String,
    sex: String,
    experience?: number,
    nextLevelExp?: number,
    level: number,
    vocationId: number,
    nextMainSkillExp?: number,
    mainSkillLevel: number,
    nextShieldSkillExp?: number,
    shieldLevel: number,
    currentLocationId: number,
    mainLocationId: number,
    balance: number,
    stamina: number,
    active: Boolean
}