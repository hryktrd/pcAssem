import {Component, OnInit} from '@angular/core';
import {Car} from '../../domain/car';
import {CarService} from '../../service/carservice';
import {Item, ItemList} from '../../../dto/Item';
import {ItemService} from '../../service/itemService';

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
    items: Item[];
    selectedItems: Item[];

    constructor(private itemService: ItemService) {
    }

    ngOnInit() {
        this.selectedItems = [];
        this.itemService.itemSearch('aaa').subscribe(
            itemList => {
                this.itemList = itemList;
                this.items = itemList.Items;
            },
            err => {
                console.log(err)
            });

    }

    rowTrackBy(index: number, row: any) {
        console.log(row);
        return row;
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
    }

    dragEnd(event) {
        this.draggedItem = null;
    }

    findIndex(item: Item) {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (item.Item.itemCode === this.items[i].Item.itemCode) {
                index = i;
                break;
            }
        }
        return index;
    }

}
