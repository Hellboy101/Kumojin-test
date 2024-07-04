import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../event.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent {
  eventForm: FormGroup;
  eventId: string;

  constructor(private fb: FormBuilder, private eventService: EventService, private route: ActivatedRoute, private router: Router) {
    this.eventForm = this.fb.group({
      name: [''],
      date: [''],
      location: [''],
      description: ['']
    });
    this.eventId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    if (!this.eventId) {
      return;
    }
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.eventForm.patchValue(event);
    });
  }

  onSubmit() {
    if (!this.eventId) {
      this.eventService.createEvent(this.eventForm.value).subscribe(() => {
        this.router.navigate(['/events']);
      });
      return;
    } else {
      this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }
}
