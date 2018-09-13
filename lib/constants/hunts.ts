interface Hunt {
    id: Number,
    name: String,
    expPerMinute: Number,
    goldPerMinute: Number,
    mobsId: Number[],
    locationId: Number
}

export const Hunts: Hunt[] = [
    {
        id: 1,
        name: 'Bat dungeon',
        expPerMinute: 10,
        goldPerMinute: 3,
        mobsId: [1],
        locationId: 1
    },
];