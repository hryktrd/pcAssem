import {Component, OnInit} from '@angular/core';
import {SelectItem} from '../../../components/common/api';

import {Item, ItemList} from '../../../dto/Item';
import {ItemService} from '../../service/itemService';
import {Shop} from '../../../dto/Shop';
import {AgentService} from "../../service/agentService";

@Component({
    templateUrl: './item-dragdrop.component.html',
    styles: [`
        .ui-grid li {
            list-style-type: none;
            padding: 10px;
            margin-bottom: 5px;
        }
    `]
})
export class ItemDragDropComponent implements OnInit{

    draggedItem: Item;
    itemList: ItemList;
    items: Item[] = [];
    searchShops: SelectItem[] = [];
    selectedItemShops: SelectItem[] = [];
    selectedItems: Item[] = [];
    selectedItemsByShop: Item[] = [];
    selectedShop: Shop;
    selectedItemShop: Shop;
    keyword: string;
    asurakuFlag: boolean;
    pointRateFlag: boolean;
    postageFlag: boolean;
    creditCardFlag: boolean;

    isMobile: boolean;

    constructor(private itemService: ItemService, private agentService: AgentService) {
    }

    ngOnInit() {
        this.isMobile = this.agentService.isMobile();
    }

    dragStart(event, item: Item) {
        this.draggedItem = item;
    }

    drop(event) {
        if (this.draggedItem) {
            // console.log(this.draggedItem);
            // const draggedItemIndex = this.findIndex(this.draggedItem);
            this.selectedItems = [...this.selectedItems, this.draggedItem];
            // this.items = this.items.filter((val, i) => i != draggedItemIndex);
            this.draggedItem = null;
        }
        //    店舗選択されている場合
        if (this.selectedItemShop) {
            this.selectedItemsByShop = this.selectedItems.filter(val => val.shopCode === this.selectedItemShop.shopCode);
        //    店舗選択されていなければ全件表示
        } else {
            this.selectedItemsByShop = this.selectedItems;
        }

        this.selectedItemShops = [{'label': '未選択', 'value': {'shopCode': null, 'shopName': null}}];
        for (const item of this.selectedItems) {
            const shop: SelectItem = {
                'label': item.shopName,
                'value': {
                    'shopCode': item.shopCode,
                    'shopName': item.shopName
                }
            };
            if (this.selectedItemShops.filter((val) => val.value.shopCode === shop.value.shopCode).length === 0) {
                this.selectedItemShops.push(shop);
            }
        }
    }

    pressItem(item) {
        this.selectedItems = [...this.selectedItems, item];

        //    店舗選択されている場合
        if (this.selectedItemShop) {
            this.selectedItemsByShop = this.selectedItems.filter(val => val.shopCode === this.selectedItemShop.shopCode);
            //    店舗選択されていなければ全件表示
        } else {
            this.selectedItemsByShop = this.selectedItems;
        }

        this.selectedItemShops = [{'label': '未選択', 'value': {'shopCode': null, 'shopName': null}}];
        for (const item of this.selectedItems) {
            const shop: SelectItem = {
                'label': item.shopName,
                'value': {
                    'shopCode': item.shopCode,
                    'shopName': item.shopName
                }
            };
            if (this.selectedItemShops.filter((val) => val.value.shopCode === shop.value.shopCode).length === 0) {
                this.selectedItemShops.push(shop);
            }
        }

    }

    dragEnd(event) {
        this.draggedItem = null;
    }

    findIndex(item: Item) {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (item.itemCode === this.items[i].itemCode) {
                index = i;
                break;
            }
        }
        return index;
    }

    showDetail(item: Item) {
        window.open(item.itemUrl);
    }

    onShopChange(event) {
        this.selectedShop = event.value;
        const searchOption = {
            'asurakuFlag': this.asurakuFlag,
            'pointRateFlag': this.pointRateFlag,
            'postageFlag': this.postageFlag
        };
        this.itemService.itemSearchByShopCode(this.keyword, this.selectedShop.shopCode, searchOption).subscribe(
            itemList => {
                this.itemList = itemList;
                this.items = itemList.Items;
                for (const item of this.items) {
                    const shop: SelectItem = {
                        'label': item.shopName,
                        'value': {
                            'shopCode': item.shopCode,
                            'shopName': item.shopName
                        }
                    };
                }
            },
            err => {
                console.log(err)
            });
    }

    onSelectedItemShopChange(event) {
        this.selectedItemShop = event.value;
        if(this.selectedItemShop.shopCode !== null) {
            this.selectedItemsByShop = this.selectedItems.filter(val => val.shopCode === this.selectedItemShop.shopCode);
        } else {
            this.selectedItemsByShop = this.selectedItems;
        }

    }

    remove(item) {
        this.selectedItems = this.selectedItems.filter((val) => val !== item);
    }

    search() {
        this.searchShops = [{'label': '未選択', 'value': {'shopCode': null, 'shopName': null}}];
        const searchOption = {
            'asurakuFlag': this.asurakuFlag,
            'pointRateFlag': this.pointRateFlag,
            'postageFlag': this.postageFlag
        };
        this.itemService.itemSearch(this.keyword, searchOption).subscribe(
            itemList => {
                this.itemList = itemList;
                this.items = itemList.Items;
                for (const item of this.items) {
                    const shop: SelectItem = {
                        'label': item.shopName,
                        'value': {
                            'shopCode': item.shopCode,
                            'shopName': item.shopName
                        }
                    };
                    if (this.searchShops.filter((val) => val.value.shopCode === shop.value.shopCode).length === 0) {
                        this.searchShops.push(shop);
                    }
                }
            },
            err => {
                console.log(err)
            });
    }

}
