import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "./App.css";
import SingleCard from "./Components/singleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
function App() {
  //1
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  //2
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled,setDisabled]=useState(false)
  //1
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };
  //1

  useEffect(()=>{shuffleCards()},[])

  //2
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false)
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );
        reset();
      } else {
        setTimeout(()=>reset(),1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);
  return (
    //1 except handle choice function ko end ma bnaya
    <div className="App">
      <h1>Match the Cards</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
           card={card}
            handleChoice={handleChoice} 
            key={card.id} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
    //1
  );
}

export default App;
