import css from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
  return (
    <section className={css.detail}>
      <img src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
