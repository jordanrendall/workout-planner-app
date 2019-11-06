import { Form, Field } from '@leveluptuts/fresh';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_WORKOUT = gql`
  mutation ADD_WORKOUT($workout: WorkoutInput) {
    addWorkout(workout: $workout) {
      _id
      name
    }
  }
`;
const WorkoutForm = ({ setWorkouts }) => {
  const [addWorkout] = useMutation(ADD_WORKOUT, {
    refetchQueries: ['getWorkouts'],
  });

  return (
    <Form
      onSubmit={data => {
        console.log(data);
        addWorkout({
          variables: {
            workout: {
              name: data.workout,
            },
          },
        });
      }}
    >
      <Field>Workout</Field>
    </Form>
  );
};

export default WorkoutForm;
