import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Item, ItemList} from '../../dto/Item';

@Injectable()
export class ItemService {

    private requestUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&callback=JSONP_CALLBACK&applicationId=1023374810845580129&affiliateId=15f69330.18c67537.15f69331.c8b1dbe1&formatVersion=2&keyword=';

    constructor(private jsonp: Jsonp) {

    }

    /**
     * 商品検索APIに接続してキーワードで商品検索
     * @param {String} keyword
     * @returns {Observable<ItemList>}
     */
    itemSearch(keyword: String): Observable<ItemList> {
        return this.jsonp.get(this.requestUrl + keyword).map(res => res.json() as ItemList);
    }

    /**
     * 商品検索APIに接続してキーワードとショップコードで商品検索
     * @param {String} keyword
     * @param shopCode
     * @returns {Observable<ItemList>}
     */
    itemSearchByShopCode(keyword: String, shopCode): Observable<ItemList> {
        return this.jsonp.get(this.requestUrl + keyword + '&shopCode=' + shopCode).map(res => res.json() as ItemList);
    }
}
