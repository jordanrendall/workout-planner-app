import Workout from './Workout';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_WORKOUTS = gql`
  query getWorkouts {
    workouts {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const WorkoutList = () => {
  const { data, loading, error } = useQuery(GET_WORKOUTS);
  if (loading) return <section />;
  if (error) {
    console.log(error);
    return <section />;
  }
  const { workouts } = data;

  return (
    <section>
      <h2>My Workouts</h2>
      {workouts.map((workout, index) => {
        return (
          <Workout key={`${workout._id}`} workout={workout} index={index} />
        );
      })}
    </section>
  );
};

export default WorkoutList;
