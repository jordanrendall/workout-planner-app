import { withApollo } from '../lib/apollo';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;
const Home = () => {
  // const { data, loading, error } = useQuery(HELLO_QUERY);

  // if (loading) return <div />;
  // console.log(data);

  return (
    <Layout>
      <div className='hero'>
        <h1 className='title'>Workout Tracker App</h1>
        <div className='list'>
          <WorkoutForm />
          <WorkoutList />
        </div>
      </div>
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin-top: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .list {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </Layout>
  );
};

export default withApollo(Home);
