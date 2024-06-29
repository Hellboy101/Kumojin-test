import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  private events = this.eventService.getEvents();

  constructor(private eventService: EventService) {}
}
