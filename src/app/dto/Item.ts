/**
 * ItemSearchで検索された結果を格納
 */
export class ItemList {
    count: number;
    page: number;
    first: number;
    last: number;
    hits: number;
    carrier: number;
    pageCount: number;
    Items: Item[];
}

export class Item {
    itemName: string;
    catchcopy: string;
    itemCode: string;
    itemPrice: number;
    itemCaption: string;
    itemUrl: string;
    affiliateUrl: string;
    imageFlag: number;
    smallImageUrls: any;
    mediumImageUrls: any;
    availability: number;
    taxFlag: number;
    postageFlag: number;
    creditCardFlag: number;
    shopOfTheYearFlag: number;
    shipOverseasFlag: number;
    shipOverseasArea: string;
    asurakuFlag: number;
    asurakuClosingTime: string;
    asurakuArea: string;
    affiliateRate: number;
    startTime: string;
    endTime: string;
    reviewCount: number;
    reviewAverage: number;
    pointRate: number;
    pointRateStartTime: string;
    pointRateEndTime: string;
    giftFlag: number;
    shopName: string;
    shopCode: string;
    shopUrl: string;
    shopAffiliateUrl: string;
    genreId: string;
    tagIds: any[];
}


