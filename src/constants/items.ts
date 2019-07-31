import { Item } from '../types/models/item.model'
// Tipos:
// Armadura [1, 10, 11, 4, 40, 41]
// Robe [2, 20, 21, 3, 30, 31]
// Armas
// Calça / Calça Leve
// Bota de Combate / Sapato
// Colar
// Brinco
// Anel

export const items: Item[] = [
    {
        id: 1,
        imageSource: '',
        name: 'Camiseta de Algodao',
        type: 'Armadura',
        class: [1, 10, 11, 4, 40, 41],
        power: 2,
        armor: 2,
        primaryAttr: 0,
        buyPrice: 0,
        sellPrice: 0,
        buyable: false,
    },
    {
        id: 2,
        imageSource: '',
        name: 'Vestimenta de Couro',
        type: '',
        class: [],
        power: 5,
        armor: 4,
        primaryAttr: 1,
        buyPrice: 2,
        sellPrice: 1,
        buyable: true,

    },
    {
        id: 3,
        imageSource: '',
        name: 'Armadura de Aço',
        type: '',
        class: [],
        power: 9,
        armor: 7,
        primaryAttr: 2,
        buyPrice: 4,
        sellPrice: 2,
        buyable: true,

    },

]