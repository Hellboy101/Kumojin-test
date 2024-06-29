"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_service_1 = require("../handlers/events.service");
const router = express_1.default.Router();
const eventService = new events_service_1.EventService();
/* GET home page. */
router.get('/', (req, res, next) => {
    const allEvents = eventService.getAllEvents();
    res.status(200).json(allEvents);
});
router.post('/insert', (req, res, next) => {
    const { name, description, date } = req.body;
    const newEvent = eventService.createEvent({ name, description, date });
});
router.get('/eventDetails', (req, res, next) => {
    const { id } = req.query;
    const event = eventService.getEventById(id);
    res.status(200).json(event);
});
exports.default = router;
