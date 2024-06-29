import express, { Request, Response, NextFunction } from 'express';
import { EventService } from '../handlers/events.service';

const router = express.Router();
const eventService = new EventService();


/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    const allEvents = eventService.getAllEvents();
    res.status(200).json(allEvents);
});

router.post('/insert', (req: Request, res: Response, next: NextFunction) => {
    const { name, description, date } = req.body;
    const newEvent = eventService.createEvent({ name, description, date });
});

router.get('/eventDetails', (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const event = eventService.getEventById(id as string);
    res.status(200).json(event);
});


export default router;
