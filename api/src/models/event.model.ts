import mongoose, { Schema, Document, model } from 'mongoose';

// Interface TypeScript correspondant à EventDetails
export interface IEventDetails extends Document {
  name: string;
  date: Date;
  location: string;
  description: string;
}

export interface IEventDetailsData {
  name: string;
  description: string;
  date: Date;
  location: string;
}

export interface IEventDetailsModel extends IEventDetails, Document {}

const EventDetailsSchema: Schema = new Schema<IEventDetails>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true }
});

const EventDetailsModel = model<IEventDetails>('EventDetails', EventDetailsSchema);

export default EventDetailsModel;
