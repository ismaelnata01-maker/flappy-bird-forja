export interface Skin {
    name: string;
    image: any;
    height: number;
    width: number;
    price: number;
}

export const skins = [
    {
        name: "Starwalker",
        image: require("@/assets/images/Starwalker_Bird1.gif"),
        height: 86,
        width: 86 * 465 / 250,
        price: 0,
    },
    {
        name: "Roaring Knight",
        image: require("@/assets/images/deltarune-roaring-knight.gif"),
        width: 86 * 136/140,
        height: 86,
        price: 20,
    }
] as Skin[]