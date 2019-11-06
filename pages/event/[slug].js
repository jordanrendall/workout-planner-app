import {useRouter} from 'next/router';
 
import Layout from '../../components/Layout';
// [slug].js title allows for dynamic page name creation
const Event = () => {
  const router = useRouter();

  const {slug} = router.query;
  return (
    <Layout>
      <h1>{slug}</h1>
    </Layout>
  );
};

export default Event;
