import axios from 'axios';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    // send data to api
    const result = await axios.post('/api/new-meetup', enteredMeetupData);
    console.log(result.data);
  }

  return (
    <>
      <h1>Add new meetup here</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
