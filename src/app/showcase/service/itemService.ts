import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Item, ItemList} from '../../dto/Item';

@Injectable()
export class ItemService {

    private requestUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=%E3%83%9E%E3%82%B6%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89&callback=JSONP_CALLBACK&applicationId=1023374810845580129';

    constructor(private jsonp: Jsonp) {

    }

    /**
     * 商品検索APIに接続
     * @param {String} keyword
     * @returns {Observable<ItemList>}
     */
    itemSearch(keyword: String): Observable<ItemList> {
        return this.jsonp.get(this.requestUrl).map(res => res.json() as ItemList);
    }
}
