import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', redirectTo: '/dragdrop', pathMatch: 'full'},
            {path: 'dragdrop', loadChildren: './components/itemDragDrop/item-dragdrop.module#ItemDragDropModule'},
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
