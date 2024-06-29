import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { EventDetails } from '../event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  event: EventDetails | undefined;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit() {
    const eventId = this.route.snapshot.params['id'];
    this.eventService.getEvent(eventId).subscribe(event => {
      this.event = event;
    });
  }
}
