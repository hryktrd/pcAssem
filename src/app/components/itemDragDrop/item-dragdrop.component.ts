import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';

import {Item, ItemList} from '../../dto/Item';
import {ItemService} from '../../service/itemService';
import {Shop} from '../../dto/Shop';
import {AgentService} from '../../service/agentService';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

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
    selectedItemShops: SelectItem[] = [];
    selectedItems: Item[] = [];
    selectedItemsByShop: Item[] = [];
    sumPriceByShop: number;
    selectedShop: Shop;
    selectedItemShop: Shop;
    keyword = '';
    asurakuFlag: boolean;
    pointRateFlag: boolean;
    postageFlag: boolean;
    creditCardFlag: boolean;

    isMobile: boolean;

    constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService, private agentService: AgentService) {
    }

    ngOnInit() {
        this.isMobile = this.agentService.isMobile();
        console.log('onInit');
        const m = this.route.paramMap.subscribe(x => {
            if (this.selectedItems.length === 0 && x.get('items')) {
                this.selectedItems = JSON.parse(x.get('items'));
                console.log(this.selectedItems);
            }
            console.log(JSON.parse(x.get('items')));
        });
        //     map((params: ParamMap) => {
        //         return JSON.parse(params.get('items'));
        //     });
        // const s = m.subscribe(items => {
        //     // if (!this.selectedItems) {
        //     if (this.selectedItems.length === 0) {
        //         console.log(this.selectedItems);
        //     }
        // });

        console.log('onInit');
    }


    dragStart(event, item: Item) {
        this.draggedItem = item;
    }

    drop(event) {
        if (this.draggedItem) {
            this.selectedItems = [...this.selectedItems, this.draggedItem];
            this.draggedItem = null;
        }
        this.rebuildSelectedItemsByShop()
        this.calcPriceByShop();
        this.rebuildSelectItemShops();

        this.router.navigate(['dragdrop', {'items': JSON.stringify(this.selectedItems)}]);
    }

    /**
     * スマホで検索結果の商品を買い物リストに追加（追加ボタンタップ）
     * @param item
     */
    pressItem(item) {
        this.selectedItems = [...this.selectedItems, item];

        this.rebuildSelectedItemsByShop()
        this.rebuildSelectItemShops();
        this.calcPriceByShop();
    }

    dragEnd(event) {
        this.draggedItem = null;
    }

    /**
     * 店舗ページに遷移
     * @param {Item} item
     */
    showDetail(item: Item) {
        window.open(item.itemUrl);
    }

    /**
     * 検索画面の選択店舗変更
     * @param event
     */
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

    /**
     * 商品選択表の選択店舗変更
     * @param event
     */
    onSelectedItemShopChange(event) {
        this.selectedItemShop = event.value;
        this.rebuildSelectedItemsByShop();
        this.calcPriceByShop();
    }

    /**
     * 選択商品削除
     * @param item 削除対象商品情報
     */
    remove(item) {
        this.selectedItems = this.selectedItems.filter((val) => val !== item);
        this.selectedItemsByShop = this.selectedItemsByShop.filter((val) => val !== item);

        this.calcPriceByShop();
        this.rebuildSelectItemShops();
    }

    /**
     * 商品検索
     */
    search() {
        if (this.keyword === '') {
            return false;
        }

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

    /**
     * 選択店舗ごとの合計金額表示
     */
    calcPriceByShop() {
        this.sumPriceByShop = 0;
        for (const item of this.selectedItemsByShop) {
            this.sumPriceByShop += item.itemPrice;
        }
    }

    /**
     * 選択商品の店舗ドロップダウンリストを再生成
     */
    rebuildSelectItemShops() {
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

    /**
     * 店舗ごとの選択商品一覧再生成
     */
    rebuildSelectedItemsByShop() {
        //    店舗選択されている場合
        if (this.selectedItemShop) {
            this.selectedItemsByShop = this.selectedItems.filter(val => val.shopCode === this.selectedItemShop.shopCode);
            //    店舗選択されていなければ全件表示
        } else {
            this.selectedItemsByShop = this.selectedItems;
        }
    }

}
