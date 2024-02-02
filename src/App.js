import './App.css';
import Die from "./Die"
import React from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import useWindowSize from 'react-use/lib/useWindowSize'

function App() {

  const [dice, setDice] = React.useState(newDices());
  const [tenzi, setTenzi] = React.useState(false);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const allDicesHeld = dice.every(die => die.isHeld);
    const checkValue = dice[0].value;
    const allDicesSame = dice.every(die => die.value === checkValue);
    if (allDicesHeld && allDicesSame) {
      setTenzi(true);
      console.log("YOU WON!!!");
    }
  }, [dice])

  function newDices() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        })
    }
    return newDice
  }

  function rollDice() {
    if (!tenzi) {
      setDice(prvDice => prvDice.map(die => {
        return die.isHeld ?
          die :
          {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
          }
      }))
    } else {
      setTenzi(false);
      setDice(newDices());
    }
  }

  function holdDice(id) {
    setDice(prvDice => prvDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  return (
    <main>
      {tenzi && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
        {diceElements}
      </div>
      <button className='roll' onClick={rollDice}>
        {tenzi ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;