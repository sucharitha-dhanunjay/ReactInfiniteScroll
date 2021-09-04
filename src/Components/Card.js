import "./Card.css";
const Card = props => {
  return (
    <li className="card">
      <div className="title">{props.title}</div>
      <div className="content">{props.content}</div>
    </li>
  );
};

export default Card;
