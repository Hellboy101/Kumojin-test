import { Request, Response } from 'express';
import { EventService } from '../services/events.service';

const eventService = EventService.getInstance();

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const newEvent = await eventService.createEvent(req.body);
        res.status(201).json(newEvent);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = await eventService.getEventById(req.params.id);
        res.status(200).json(event);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
        res.status(200).json(updatedEvent);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        await eventService.deleteEvent(req.params.id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
