// database collection

import mongoose, { Schema } from 'mongoose';
export const WorkoutsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.workouts ||
  mongoose.model('workouts', WorkoutsSchema);
