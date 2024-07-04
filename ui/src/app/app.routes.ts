import { Routes } from '@angular/router';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventListComponent },
  { path: 'events/create', component: EventCreateComponent },
  { path: 'events/edit/:id', component: EventCreateComponent },
  { path: 'events/:id', component: EventDetailsComponent }
];
