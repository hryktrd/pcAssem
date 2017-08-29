import { Injectable } from '@angular/core';

@Injectable()
export class AgentService {

    private ua = navigator.userAgent.toLowerCase();

    isMobile(): boolean {
        return (
            this.ua.indexOf('iphone') > -1 ||
            this.ua.indexOf('ipad') > -1 ||
            this.ua.indexOf('android') > -1
        );
    }
}
