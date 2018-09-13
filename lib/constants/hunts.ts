interface Hunt {
    id: Number,
    name: String,
    expPerMinute: Number,
    goldPerMinute: Number,
    locationId: Number
}

export const Hunts: Hunt[] = [
    {
        id: 1,
        name: 'Bat',
        expPerMinute: 5,
        goldPerMinute: 2,
        locationId: 1
    },
    {
        id: 2,
        name: 'Cave Rat',
        expPerMinute: 7,
        goldPerMinute: 3,
        locationId: 2
    },
    {
        id: 3,
        name: 'Spider',
        expPerMinute: 10,
        goldPerMinute: 4,
        locationId: 1
    },
    {
        id: 4,
        name: 'Troll',
        expPerMinute: 12,
        goldPerMinute: 5,
        locationId: 2
    },
    {
        id: 5,
        name: 'Bear',
        expPerMinute: 15,
        goldPerMinute: 5,
        locationId: 1
    },
    {
        id: 6,
        name: 'Orc',
        expPerMinute: 18,
        goldPerMinute: 7,
        locationId: 3
    },
    {
        id: 7,
        name: 'Skeleton',
        expPerMinute: 21,
        goldPerMinute: 9,
        locationId: 2
    },
    {
        id: 8,
        name: 'Rotworm',
        expPerMinute: 25,
        goldPerMinute: 11,
        locationId: 3
    },
    {
        id: 9,
        name: 'Minotaur',
        expPerMinute: 30,
        goldPerMinute: 13,
        locationId: 5
    },
    {
        id: 10,
        name: 'Elf',
        expPerMinute: 35,
        goldPerMinute: 15,
        locationId: 5
    }
];