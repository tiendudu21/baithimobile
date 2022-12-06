import products from "./products";

const categories = [
    {
        id: 1,
        title: "Tất cả",
        recipes: products,
    },
    {
        id: 2,
        title: "Trà sữa",
        recipes: [...products.slice(1, 3, 6)],
    },
    {
        id: 3,
        title: "Nước ép",
        recipes: [...products.slice(4, 5, )],
    },
    {
        id: 4,
        title: "Trà",
        recipes: [...products.slice(2, 8)],
    },
    {
        id: 5,
        title: "Nước giải khát",
        recipes: [...products.slice(9, )],
    },
];

export default categories;