import { useState, useEffect } from 'react';
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
  const [meetupsArr, setMeetupsArr] = useState([]);

  useEffect(() => {
    setMeetupsArr(DUMMY_MEETUPS);
  }, []);

  return (
    <>
      <h1>Home meetup page</h1>
      <MeetupList meetups={meetupsArr} />
    </>
  );
};

// tam kad puslapis butu sugeneruotas duomenims pasikeitus yra naudojami 2 budai
// SSR server side rendering - duomenys sugeneruojami uzklausos metu, labiau tinka kai duomenys kinta kas sekunde ar greiciau
// SSG static site generating - duomenys sugeneruojami aplikacijos sukurimo metu ir atnaujinami jei reikia tam tikru intervalu

export default HomePage;
