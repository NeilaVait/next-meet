import MeetupDetail from './../../components/meetups/MeetupDetail';
import { getCollection } from './../../utils/mongo-data';
import { ObjectId } from 'mongodb';

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
  const [meetupCollection, client] = await getCollection();
  const allMeets = await meetupCollection.find({}).toArray();
  client.close();

  const pathsArrOfCurrentMeets = allMeets.map((m) => {
    return {
      params: {
        meetupId: m._id.toString(),
      },
    };
  });

  return {
    fallback: false, // TRUE jei einam i psl kurio nera aprasyta paths tai tas puslapis sugeneruojamas uzklausos metu(at run time)
    // FALSE gaunam 404 jei puslapio nera
    paths: pathsArrOfCurrentMeets,
  };
}

export async function getStaticProps(context) {
  const [meetupCollection, client] = await getCollection();
  const currentId = context.params.meetupId;
  const currentMeetObj = await meetupCollection.findOne({ _id: ObjectId(currentId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: currentId,
        title: currentMeetObj.title,
        image: currentMeetObj.image,
        address: currentMeetObj.address,
        description: currentMeetObj.description,
      },
    },
    revalidate: 5,
  };
}

export default MeetupDetails;
