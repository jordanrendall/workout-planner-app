import { ApolloServer, gql } from 'apollo-server-micro';
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit';
import connectDatabase from '../../lib/mongoose';
import { workoutsQueries } from '../../src/api/workouts/queries';
import { workoutsMutations } from '../../src/api/workouts/mutations';
import Workouts from '../../src/api/workouts/Workouts.graphql';

const fakeTypeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const fakeResolvers = {
  Query: {
    sayHello: () => {
      return 'Hello!';
    },
  },
};

const resolvers = mergeResolvers([
  fakeResolvers,
  workoutsQueries,
  workoutsMutations,
]);

const typeDefs = mergeTypeDefs([fakeTypeDefs, Workouts]);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = apolloServer.createHandler({
  path: '/api/graphql',
});
export default connectDatabase(server);

//Simple api route:
//Short way
// export default (req, res) => {
//   res.status(200).json({
//     test: 'Hello',
//   });
// };

//Long version:
// export default (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.statusCode = 200;
//     res.end(
//       JSON.stringify({
//         test: 'Hello',
//       })
//     );
//   };
