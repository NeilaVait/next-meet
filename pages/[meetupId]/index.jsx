import MeetupDetail from './../../components/meetups/MeetupDetail';

const MeetupDetails = () => {
  return (
    <>
      <MeetupDetail
        id="m1"
        title="The first meetup"
        image="https://picsum.photos/id/1067/900/600/"
        address="Some street 5, 23548, New York, New York"
        description="First meetup in NY"
      />
    </>
  );
};

export default MeetupDetails;
