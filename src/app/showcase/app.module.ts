import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';

import {ItemService} from './service/itemService';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        JsonpModule,
        BrowserAnimationsModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ItemService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}