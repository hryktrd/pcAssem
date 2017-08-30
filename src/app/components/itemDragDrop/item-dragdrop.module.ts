import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ItemDragDropComponent} from './item-dragdrop.component';
import {DragDropRoutingModule} from './item-dragdrop-routing.module';
import {DragDropModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {CodeHighlighterModule} from 'primeng/primeng';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragDropRoutingModule,
        DragDropModule,
        DropdownModule,
        PanelModule,
        DataTableModule,
        TabViewModule,
        CodeHighlighterModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        ClipboardModule
    ],
    declarations: [
        ItemDragDropComponent
    ]
})
export class ItemDragDropModule {
}
