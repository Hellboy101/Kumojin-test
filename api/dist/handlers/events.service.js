"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const mongoClient_service_1 = require("./mongoClient.service");
class EventService {
    constructor() {
        this.eventCollection = 'events';
    }
    static getInstance() {
        if (!EventService.instance) {
            EventService.instance = new EventService();
        }
        return EventService.instance;
    }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongoClient_service_1.mongoClient.client((db) => __awaiter(this, void 0, void 0, function* () {
                yield db.collection(this.eventCollection).insertOne(event);
            }));
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(this.eventCollection);
            const event = yield collection.findOne({ _id: id });
            return event;
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(this.eventCollection);
            const events = yield collection.find().toArray();
            return events;
        });
    }
    updateEvent(id, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(this.eventCollection);
            yield collection.updateOne({ _id: id }, { $set: event });
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(this.eventCollection);
            yield collection.deleteOne({ _id: id });
        });
    }
    /**
     * Get all events from the database
     * @returns :Promise<any[]> - An array of event objects
     */
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(this.eventCollection);
            const events = yield collection.find().toArray();
            return events;
        });
    }
    /**
     * Get a collection from the database
     * @param collection :string - The name of the collection to get
     * @returns :Promise<any> - The collection object
     */
    getCollection(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongoClient_service_1.mongoClient.client((db) => __awaiter(this, void 0, void 0, function* () {
                return yield db.collection(collection);
            }));
        });
    }
}
exports.EventService = EventService;
