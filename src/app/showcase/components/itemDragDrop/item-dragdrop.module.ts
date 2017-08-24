import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemDragDropComponent} from './item-dragdrop.component';
import {DragDropRoutingModule} from './item-dragdrop-routing.module';
import {DragDropModule} from '../../../components/dragdrop/dragdrop';
import {PanelModule} from '../../../components/panel/panel';
import {DataTableModule} from '../../../components/datatable/datatable';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';


@NgModule({
	imports: [
		CommonModule,
		DragDropRoutingModule,
        DragDropModule,
        PanelModule,
        DataTableModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ItemDragDropComponent
	]
})
export class ItemDragDropModule {}
