export interface Character {
    id: String,
    userId: String,
    name: String,
    sex: String,
    experience?: number,
    nextLevelExp?: number,
    level: number,
    vocationId: number,
    mainSkillLevel: number,
    shieldLevel: number,
    currentLocationId: number,
    mainLocationId: number,
    balance: number,
    stamina: number,
    active: Boolean
}