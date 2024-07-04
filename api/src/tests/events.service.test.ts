import { EventService } from '../services/events.service';
import { IEventDetailsData } from '../models/event.model';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('EventService', () => {
  const eventService = EventService.getInstance();

  it('should create a new event', async () => {
    const event: IEventDetailsData = {
      name: 'Test Event',
      date: new Date(),
      location: 'Test Location',
      description: 'Test Description'
    };

    const savedEvent = await eventService.createEvent(event);
    expect(savedEvent).toHaveProperty('_id');
    expect(savedEvent.name).toBe(event.name);
    expect(savedEvent.location).toBe(event.location);
  });

  it('should get an event by ID', async () => {
    const event: IEventDetailsData = {
      name: 'Test Event 2',
      date: new Date(),
      location: 'Test Location 2',
      description: 'Test Description 2'
    };

    const savedEvent = await eventService.createEvent(event);
    const foundEvent = await eventService.getEventById(savedEvent.id.toString());
    expect(foundEvent).toHaveProperty('id');
    expect(foundEvent.name).toBe(event.name);
    expect(foundEvent.location).toBe(event.location);
  });

  it('should get all events', async () => {
    const events = await eventService.getAllEvents();
    expect(events.length).toBeGreaterThan(0);
  });

  it('should update an event by ID', async () => {
    const event: IEventDetailsData = {
      name: 'Test Event 3',
      date: new Date(),
      location: 'Test Location 3',
      description: 'Test Description 3'
    };

    const savedEvent = await eventService.createEvent(event);
    const updatedEvent = await eventService.updateEvent(savedEvent.id.toString(), { name: 'Updated Test Event 3' });
    expect(updatedEvent).toHaveProperty('_id');
    expect(updatedEvent.name).toBe('Updated Test Event 3');
  });

  it('should delete an event by ID', async () => {
    const event: IEventDetailsData = {
      name: 'Test Event 4',
      date: new Date(),
      location: 'Test Location 4',
      description: 'Test Description 4'
    };

    const savedEvent = await eventService.createEvent(event);
    await eventService.deleteEvent(savedEvent.id.toString());
    await expect(eventService.getEventById(savedEvent.id.toString())).rejects.toThrow('Event not found');
  });
});
