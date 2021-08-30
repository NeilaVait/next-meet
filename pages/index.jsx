import MeetupList from './../components/meetups/MeetupList';
import Layout from './../components/layout/Layout';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'The first meetup',
    image: 'https://picsum.photos/id/1029/600/900/',
    address: 'Some street 5, 23548, New York, New York',
    description: 'First meetup in NY',
  },
  {
    id: 'm2',
    title: 'The London meetup',
    image: 'https://picsum.photos/id/1031/600/900/',
    address: 'Some street 20, 452789, London, UK',
    description: 'Meetup in UK',
  },
];

const HomePage = () => {
  return (
    <Layout>
      <h1>Home meetup page</h1>
      <MeetupList meetups={DUMMY_MEETUPS} />
    </Layout>
  );
};

export default HomePage;
