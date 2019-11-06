export const workoutsResolvers = {
  Query: {
    async workouts() {
      console.log('Workouts');
      return [
        {
          _id: 'testid',
          name: 'First Workout',
        },
      ];
    },
  },
};
