import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_EVENT = gql`
  mutation addEvent($workoutId: ID, $date: Date) {
    addEvent(workoutId: $workoutId, date: $date) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;

const REMOVE_EVENT = gql`
  mutation removeEvent($workoutId: ID, $eventId: ID) {
    removeEvent(workoutId: $workoutId, eventId: $eventId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`;
const WorkoutButton = ({ date, workoutId, events }) => {
  const [addEvent] = useMutation(ADD_EVENT, {
    refetchQueries: ['getWorkouts'],
  });
  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: ['getWorkouts'],
  });
  const foundDate = events.find(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === date.getDate();
  });

  return (
    <span>
      {date.getMonth() + 1}/{date.getDate()}
      {foundDate ? (
        <button
          onClick={() =>
            removeEvent({
              variables: {
                workoutId,
                eventId: foundDate._id,
              },
            })
          }
        >
          X
        </button>
      ) : (
        <button
          onClick={() =>
            addEvent({
              variables: {
                workoutId,
                date,
              },
            })
          }
        >
          O
        </button>
      )}
      <style jsx>{`
        span {
          display: flex;
          flex-direction: column;
        }
        // CANNOT NEST WITHIN STYLE -JSX (CAN USE STYLED COMPONENTS INSTEAD)
        span + span {
          margin-left: 10px;
        }
        button {
          margin-top: 1rem;
          border: none;
        }
      `}</style>
    </span>
  );
};

export default WorkoutButton;
