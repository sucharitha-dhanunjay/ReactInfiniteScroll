import Card from "./Card";
import "./CardsList.css";
const CardsList = props => {
  return (
    <ul className="cardsList">
      {props.items.map(item => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.body}
        />
      ))}
    </ul>
  );
};

export default CardsList;
