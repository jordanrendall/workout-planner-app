import Workouts from './workouts';

export const workoutsMutations = {
  Mutation: {
    async addWorkout(_, { workout }) {
      console.log('Add Workout');
      try {
        const newWorkout = await Workouts.create({
          ...workout,
        });
        return newWorkout;
      } catch (e) {
        console.log(e);
      }
    },
    async addEvent(_, { workoutId, date }) {
      console.log('add event');
      try {
        date.setHours(0, 0, 0, 0);
        const workout = await Workouts.findOneAndUpdate(
          {
            _id: workoutId,

            // need the following because we are 'adding to set' below. If we didn't include it, it would add the event regardless of its unique param
            'events.date': {
              $ne: date,
            },
          },
          {
            $addToSet: {
              events: {
                date,
              },
            },
          }
        );
        return workout;
      } catch (e) {
        console.log(e);
      }
    },
    async removeEvent(_, { workoutId, eventId }) {
      console.log('remove event');
      try {
        const workout = await Workouts.findOneAndUpdate(
          {
            _id: workoutId,
          },
          {
            $pull: {
              events: {
                _id: eventId,
              },
            },
          }
        );
        return workout;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
