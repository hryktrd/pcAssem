import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ItemDragDropComponent} from './item-dragdrop.component';
import {DragDropRoutingModule} from './item-dragdrop-routing.module';
import {DragDropModule} from '../../../components/dragdrop/dragdrop';
import {PanelModule} from '../../../components/panel/panel';
import {DataTableModule} from '../../../components/datatable/datatable';
import {DropdownModule} from '../../../components/dropdown/dropdown';
import {ButtonModule} from '../../../components/button/button';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {CheckboxModule} from '../../../components/checkbox/checkbox';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';


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
        CheckboxModule
    ],
    declarations: [
        ItemDragDropComponent
    ]
})
export class ItemDragDropModule {
}
