import EventDetailsModel, { IEventDetails, IEventDetailsData } from "../models/event.model";

export class EventService {
    private static instance: EventService;

    public static getInstance(): EventService {
        if (!EventService.instance) {
            EventService.instance = new EventService();
        }

        return EventService.instance;
    }

    public async createEvent(event: IEventDetailsData) {
        try {
            console.log(event);
            const newEvent: IEventDetails = new EventDetailsModel(event);
            const savedEvent = await newEvent.save();
            return savedEvent;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    public async getEventById(id: string): Promise<IEventDetailsData> {
        try {
            const eventDb = await EventDetailsModel.findById(id);
            if (!eventDb) {
                throw new Error('Event not found');
            }
            const event: IEventDetails = eventDb.toObject();
            event.id = eventDb._id;
            delete event._id;
            delete event.__v;
            return event;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getAllEvents(): Promise<IEventDetailsData[]> {
        try {
            const events = await EventDetailsModel.find();
            if (!events) {
                throw new Error('No events found');
            }
            return events.map(eventDb => {
                const event: IEventDetails = eventDb.toObject();
                event.id = eventDb._id;
                delete event._id;
                delete event.__v;
                return event;
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async updateEvent(id: string, event: Partial<IEventDetails>) {
        try {
            const updatedEvent = await EventDetailsModel.findByIdAndUpdate(id, event, { new: true, runValidators: true });
            if (!updatedEvent) {
                throw new Error('Event not found');
            }
            return updatedEvent;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async deleteEvent(id: string) {
        try {
            const deletedEvent = await EventDetailsModel.findByIdAndDelete(id);
            if (!deletedEvent) {
                throw new Error('Event not found');
            }
            return deletedEvent;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
