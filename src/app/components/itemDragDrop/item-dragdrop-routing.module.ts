import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ItemDragDropComponent} from './item-dragdrop.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: ItemDragDropComponent},
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DragDropRoutingModule {
}
