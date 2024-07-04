import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
    declarations: [],
    imports: [
        EventListComponent,
        EventCreateComponent,
        EventDetailsComponent,
        CommonModule,
        RouterModule,
    ],
    exports: [
    ]
})
export class EventsModule { }
