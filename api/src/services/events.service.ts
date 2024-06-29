import EventDetailsModel, { IEventDetails } from "../models/event.model";
import { mongoClient } from "./mongoClient.service";


export class EventService {
    private static instance: EventService;
    private eventCollection: string = 'events';

    public static getInstance(): EventService {
        if (!EventService.instance) {
            EventService.instance = new EventService();
        }

        return EventService.instance;
    }

    public async createEvent(event: IEventDetails) {
        return await mongoClient.client(async (db) => {
            try {
                const newEvent: IEventDetails = new EventDetailsModel(event);
                const savedEvent = await newEvent.save();
                return savedEvent;
            } catch (error) {
                console.error(error);
                throw error;
            }
        });
    }

    public async getEventById(id: string) {
        const collection = await this.getCollection(this.eventCollection);
        const event = await collection.findOne({ _id: id });
        return event;
    }

    public async getAllEvents() {
        const collection = await this.getCollection(this.eventCollection);
        const events = await collection.find().toArray();
        return events;
    }

    public async updateEvent(id: string, event: any) {
        const collection = await this.getCollection(this.eventCollection);
        await collection.updateOne({ _id: id }, { $set: event });
    }

    public async deleteEvent(id: string) {
        const collection = await this.getCollection(this.eventCollection);
        await collection.deleteOne({ _id: id });
    }

    /**
     * Get all events from the database
     * @returns :Promise<any[]> - An array of event objects
     */
    public async getEvents() {
        const collection = await this.getCollection(this.eventCollection);
        const events = await collection.find().toArray();
        return events;
    }

    /**
     * Get a collection from the database
     * @param collection :string - The name of the collection to get
     * @returns :Promise<any> - The collection object
     */
    public async getCollection(collection: string) {
        return await mongoClient.client(async (db) => {
            return await db.collection(collection)
        });
    }
}