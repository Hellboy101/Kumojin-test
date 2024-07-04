import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventDetails } from '../event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  public events: EventDetails[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe({
      next: (allEvents) => {
        this.events = allEvents;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }
}
