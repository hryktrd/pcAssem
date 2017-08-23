import {Component, OnInit} from '@angular/core';
import {Car} from '../../domain/car';
import {CarService} from '../../service/carservice';
import {Item, ItemList} from '../../../dto/Item';

@Component({
    templateUrl: './dragdropdemo.html',
    styles: [`
        .ui-grid li {
            list-style-type: none;
            padding: 10px;
            margin-bottom: 5px;
        }
    `]
})
export class DragDropDemo implements OnInit {

    availableCars: Car[];

    selectedCars: Car[];

    draggedCar: Car;

    draggedItem: Item;
    ItemList: ItemList;
    items: Item[];
    selectedItems: Item[];

    constructor(private carService: CarService) {
    }

    ngOnInit() {
        this.selectedCars = [];
        this.selectedItems = [];
        this.carService.getCarsSmall().then(cars => this.availableCars = cars);
        this.items = [
            {
                'ASIN': 'asin000011111',
                'DetailPageURL': 'http://detail_url',
                'ItemAttributes': {
                    'Manufacturer': 'manu123',
                    'ProductGroup': '111111',
                    'Title': 'MB'
                }
            },
            {
                'ASIN': 'asin000011111',
                'DetailPageURL': 'http://detail_url1',
                'ItemAttributes': {
                    'Manufacturer': 'manu456',
                    'ProductGroup': '2222222',
                    'Title': 'CPU'
                }
            }
        ]

    }

    dragStart(event, item: Item) {
        this.draggedItem = item;
    }

    drop(event) {
        if (this.draggedItem) {
            const draggedItemIndex = this.findIndex(this.draggedItem);
            this.selectedItems = [...this.selectedItems, this.draggedItem];
            this.items = this.items.filter((val, i) => i != draggedItemIndex);
            this.draggedItem = null;
        }
    }

    dragEnd(event) {
        this.draggedItem = null;
    }

    findIndex(item: Item) {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (item.ASIN === this.items[i].ASIN) {
                index = i;
                break;
            }
        }
        return index;
    }

}
