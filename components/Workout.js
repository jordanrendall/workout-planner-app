import WorkoutButton from './WorkoutButton';

const colours = ['#718096', '#f56565', '#f6e05e', '#68d391', '#63b3ed'];

const Workout = ({ workout, index }) => {
  const dates = getLast5Days();
  return (
    <article>
      <h3 style={{ borderColor: colours[index % colours.length] }}>
        {workout.name}
      </h3>
      <div className='buttons'>
        {dates.map(date => {
          return (
            <WorkoutButton
              key={date.getTime()}
              date={date}
              workoutId={workout._id}
              events={workout.events}
            />
          );
        })}
      </div>
      <style jsx>{`
        article {
          padding: 20px;
          border-radius: 15px;
          box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
        }
        h3 {
          border-bottom: solid 4px ${colours[index % colours.length]};
          margin-top: 0;
        }
        .buttons {
          display: flex;
        }
      `}</style>
    </article>
  );
};
const getLast5Days = () => {
  const dates = '01234'.split('').map(day => {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - day);
    return tempDate;
  });
  return dates;
};
export default Workout;
