import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'dragdrop', loadChildren: './components/dragdrop/dragdropdemo.module#DragDropDemoModule'},
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
