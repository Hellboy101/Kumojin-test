import express, { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/events.service';

const router = express.Router();
const eventService = new EventService();


/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    const allEvents = eventService.getAllEvents();
    res.status(200).json(allEvents);
});

/**
 * @swagger
 * /events/insert:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid request body
 */
router.post('/insert', (req: Request, res: Response, next: NextFunction) => {
    const { name, description, date, location } = req.body;
    const newEvent = eventService.createEvent({ name, description, date, location });
});

/**
 * @swagger
 * /events/eventDetails:
 *   get:
 *     summary: Get event details by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */
// get event details by id */
router.get('/eventDetails', (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const event = eventService.getEventById(id as string);
    res.status(200).json(event);
});


export default router;
