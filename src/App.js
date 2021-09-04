import "./App.css";
import CardsList from "./Components/CardsList";
import { useState, useEffect } from "react";

let start = 1;
const count = 10;

export default function App() {
  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchTopTenCards = () => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/?_page=${start}&_limit=${count}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCardsList(data);
      });
  };

    const fetchNextCards = () => {

    start = start + 1;
     
    fetch(
      `https://jsonplaceholder.typicode.com/posts/?_page=${start}&_limit=${count}`
    )
      .then(response => {
        return response.json();
      })

      .then(data => {
        setCardsList(prevstate => {
          return [...prevstate, ...data]; //apend the newly loaded ten items at the end of previous list
        });

        setisLoading(false);
      });
  };

  useEffect(
    () => {
      if (!isLoading) return;
      fetchNextCards(); //Load the next ten items whenever scroll event happens
    },
    [isLoading]
  );

  useEffect(() => {
    fetchTopTenCards(); //Load only the first ten items when the page renders for the first time
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  const handleScroll = () => {
      if ( window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
          isLoading || start == 10) { //start value of 10 indicates that all 100 items from response are loaded
         return;
      }
    setisLoading(true);
  };

  return (
    <div>
      <CardsList items={cardsList} />
      <div> {isLoading && "Loading..."} </div>
    </div>
  );
}
