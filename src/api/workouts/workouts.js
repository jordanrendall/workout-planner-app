import mongoose, { Schema } from 'mongoose';
const EventsSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
});

export const WorkoutsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  events: [EventsSchema],
});

export default mongoose.models.workouts ||
  mongoose.model('workouts', WorkoutsSchema);
