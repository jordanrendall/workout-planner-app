import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Workouts from './workouts';

export const workoutsQueries = {
  Query: {
    async workouts() {
      try {
        const allWorkouts = await Workouts.find();
        return allWorkouts;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); //value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};
