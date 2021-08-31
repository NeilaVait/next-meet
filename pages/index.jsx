import { getCollection } from '../utils/mongo-data';
import MeetupList from './../components/meetups/MeetupList';
import Head from 'next/head';

// jei importuojam kazka kas bus naudojama getserversideprops arba getstaticprops
// jie nebuna prideti prie galutinio react komponento

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>All Meetups - React Meetups</title>
        <meta name="description" content="Browse meetups around the world" />
      </Head>
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
  const [meetupCollection, client] = await getCollection();

  const allMeets = await meetupCollection.find({}).toArray();
  client.close();

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
