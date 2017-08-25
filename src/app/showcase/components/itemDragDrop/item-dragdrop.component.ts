import {Component, OnInit} from '@angular/core';
import {SelectItem} from '../../../components/common/api';

import {Item, ItemList} from '../../../dto/Item';
import {ItemService} from '../../service/itemService';
import {Shop} from '../../../dto/Shop';

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
export class ItemDragDropComponent implements OnInit {

    draggedItem: Item;
    itemList: ItemList;
    items: Item[] = [];
    searchShops: SelectItem[] = [];
    selectedShops: SelectItem[] = [];
    selectedItems: Item[] = [];
    selectedShop: Shop;
    keyword: string;

    constructor(private itemService: ItemService) {
    }

    ngOnInit() {


    }

    // rowTrackBy(index: number, row: any) {
    //     console.log(row);
    //     // this.selectedItems =row;
    //     return row;
    // }

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
        this.itemService.itemSearchByShopCode(this.keyword, this.selectedShop.shopCode).subscribe(
            itemList => {
                this.itemList = itemList;
                this.items = itemList.Items;
                console.log(this.items);
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

    remove(item) {
        this.selectedItems = this.selectedItems.filter((val) => val !== item );
    }

    search() {
        this.searchShops = [];
        this.itemService.itemSearch(this.keyword).subscribe(
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
