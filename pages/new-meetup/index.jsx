import axios from 'axios';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SITE_NAME } from './../../utils/config';

const NewMeetup = () => {
  // title - create meetup - react meetup
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    // send data to api
    const result = await axios.post('/api/new-meetup', enteredMeetupData);
    console.log(result.data);
    if (result.data) router.push('/');
  }

  return (
    <>
      <Head>
        <title>Create Meetup - {SITE_NAME}</title>
        <meta name="description" content="Add new meetup and connect with people" />
      </Head>
      <h1>Add new meetup here</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
