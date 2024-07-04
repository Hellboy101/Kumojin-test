import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDetails } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventDetails[]> {
    return this.http.get<EventDetails[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<EventDetails> {
    return this.http.get<EventDetails>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: Event): Observable<EventDetails> {
    return this.http.post<EventDetails>(`${this.apiUrl}/insert`, event);
  }

  updateEvent(id: string, event: Event): Observable<EventDetails> {
    return this.http.put<EventDetails>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
