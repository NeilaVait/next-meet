import NewMeetupForm from './../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  function addMeetupHandler(enteredData) {
    console.log(enteredData);
  }

  return (
    <>
      <h1>Add new meetup here</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
