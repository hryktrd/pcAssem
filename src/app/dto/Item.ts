/**
 * ItemSearchで検索された結果を格納
 */
export class ItemList {
    TotalResults: number;
    TotalPages: number;
    Item: Item[];
}

export class Item {
    ASIN: string;
    DetailPageURL: string;
    ItemAttributes: any;
}

class ItemAttributes {
    Manufacturer: string;
    ProductGroup: string;
    Title: string;
}
