export interface Hunt {
    id: number,
    name: string,
    expPerStamina: number,
    goldPerStamina: number,
    locationId: number,
    power: number,
    image: string;
}

export interface HuntSuccess {
    charLevel: number,
    charExp: number,
    charNextLeveLExp: number,
    xpGain: number,
    goldGain: number,
    staminaLost: number
}

export interface HuntFailed {
    charLevel: number,
    charExp: number,
    charNextLeveLExp: number,
    xpLost: number,
    staminaLost: number
}