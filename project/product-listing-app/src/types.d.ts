export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    favourite?: boolean;
};

export enum SortBy {
    NAME = "name",
    PRICE = "price",
    NONE = "",
}
