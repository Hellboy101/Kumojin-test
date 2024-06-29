import mongoose, { Schema, Document, model } from 'mongoose';

// Interface TypeScript correspondant à EventDetails
export interface IEventDetails extends Document {
  name: string;
  date: Date;
  location: string;
  description: string;
}

// Schéma Mongoose pour EventDetails
const EventDetailsSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true }
});

// Modèle Mongoose pour EventDetails
const EventDetailsModel = model<IEventDetails>('EventDetails', EventDetailsSchema);

export default EventDetailsModel;
