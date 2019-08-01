export interface Item {
    _id: number,
    imageSource: String,
    name: String,
    type: String,
    class: number[],
    power: number,
    armor: number,
    primaryAttr: number,
    buyPrice: number,
    sellPrice: number,
    buyable: boolean,
    minLevel: number,
}