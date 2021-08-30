import MeetupList from './../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'The first meetup',
    image: 'https://picsum.photos/id/1067/900/600/',
    address: 'Some street 5, 23548, New York, New York',
    description: 'First meetup in NY',
  },
  {
    id: 'm2',
    title: 'The London meetup',
    image: 'https://picsum.photos/id/1031/900/600/',
    address: 'Some street 20, 452789, London, UK',
    description: 'Meetup in UK',
  },
];

const HomePage = () => {
  return (
    <>
      <h1>Home meetup page</h1>
      <MeetupList meetups={DUMMY_MEETUPS} />
    </>
  );
};

export default HomePage;
