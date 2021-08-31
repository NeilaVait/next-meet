import axios from 'axios';
import MeetupList from './../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
// jei importuojam kazka kas bus naudojama getserversideprops arba getstaticprops
// jie nebuna prideti prie galutinio react komponento

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

const HomePage = (props) => {
  return (
    <>
      <h1>Home meetup page</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// tam kad puslapis butu sugeneruotas duomenims pasikeitus yra naudojami 2 budai
// SSR server side rendering - duomenys sugeneruojami uzklausos metu, labiau tinka kai duomenys kinta kas sekunde ar greiciau
// SSG static site generating - duomenys sugeneruojami aplikacijos sukurimo metu ir atnaujinami jei reikia tam tikru intervalu, greitesnis uz SSR

////////////////////////////// SSR

// export function getServerSideProps(context) {
//   // sitas kodas niekada neatsidurs pas klienta
//   const req = context.req;
//   const res = context.res;
//   console.log(req);

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

////////////////////////////// SSG

export async function getStaticProps() {
  // sitas kodas niekada neatsidurs pas klienta
  // veikia tiktai pages, pavadinimas butinai toks pats
  // cia galima sakyti yra back end erdve
  // galetu buti fetch, validacija ir pan
  // paduodam duomenis ir nebereikia state
  const client = await MongoClient.connect(process.env.MONGO_CONN);
  const db = client.db();

  // sukurti arba nusitaikyti i esama collection
  const meetupCollection = db.collection('meetups');
  const allMeets = await meetupCollection.find({}).toArray();
  client.close();
  console.log(allMeets);
  const meetsInRequiredFormat = allMeets.map((m) => {
    // _id yra ObjectId, klaida jei bandom nuskaityt kaip stringa
    return {
      id: m._id.toString(),
      title: m.title,
      image: m.image,
      address: m.address,
      description: m.description,
    };
  });

  return {
    props: {
      meetups: meetsInRequiredFormat,
    },
    revalidate: 10, // kas 10s duomenys atnaujinami
  };
}

export default HomePage;
