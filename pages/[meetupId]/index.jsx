import MeetupDetail from './../../components/meetups/MeetupDetail';
// import { MongoClient } from 'mongodb';
import { getCollection } from './../../utils/mongo-data';

const MeetupDetails = (props) => {
  return (
    <>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const allMeets = await getCollection();

  console.log('meets getstaticpaths0', allMeets);
  const pathsArrOfCurrentMeets = allMeets.map((m) => {
    return {
      params: {
        meetupId: m._id.toString(),
      },
    };
  });
  console.log(allMeets);

  return {
    fallback: false, // TRUE jei einam i psl kurio nera aprasyta paths tai tas puslapis sugeneruojamas uzklausos metu(at run time)
    // FALSE gaunam 404 jei puslapio nera
    paths: pathsArrOfCurrentMeets,
  };
}

export function getStaticProps(context) {
  console.log(context.params.meetupId);
  return {
    props: {
      meetupData: {
        id: 'm1',
        title: 'The first meetup',
        image: 'https://picsum.photos/id/1067/900/600/',
        address: 'Some street 5, 23548, New York, New York',
        description: 'First meetup in NY',
      },
    },
    revalidate: 5,
  };
}

export default MeetupDetails;
