import './App.css';
import Die from "./Die"
import React from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import useWindowSize from 'react-use/lib/useWindowSize'

function App() {
  const [startGame, setStartGame] = React.useState(false);
  const [dice, setDice] = React.useState(newDices());
  const [rolls, setRolls] = React.useState(0);
  const [bestRolls, setBestRolls] = React.useState(JSON.parse(localStorage.getItem('bestRolls')) || 0);
  const [tenzi, setTenzi] = React.useState(false);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const allDicesHeld = dice.every(die => die.isHeld);
    const checkValue = dice[0].value;
    const allDicesSame = dice.every(die => die.value === checkValue);
    if (allDicesHeld && allDicesSame) {
      setTenzi(true);
      console.log("YOU WON!!!");
      if ((rolls < bestRolls) || bestRolls === 0) {
        localStorage.setItem("bestRolls", rolls);
        setBestRolls(rolls);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (startGame) {
      if (!tenzi) {
        setRolls(prvRolls => prvRolls += 1)
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
        setRolls(0)
        setDice(newDices());
      }
    } else {
      setStartGame(true)
      setRolls(0)
    }
  }

  function holdDice(id) {
    if (startGame) {
      setDice(prvDice => prvDice.map(die => {
        return die.id === id ?
          { ...die, isHeld: !die.isHeld } :
          die
      }))
    }
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  return (
    <>
      <main>
        {tenzi && <Confetti width={width} height={height} />}
        <h1 className="title">TENZI</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
          {diceElements}
        </div>
        <button className='roll' onClick={rollDice}>
          {
            !startGame ?
              "Start" :
              tenzi ?
                "New Game" :
                "Roll"
          }
        </button>
        <div className='scores'>
          <div className='rolls'><p>Rolls <br /> {rolls}</p></div>
          <div className='timer'><p>Timer <br /> {0}</p></div>
        </div>
      </main>
      <div className='best-scores'>
        <div className='best-time'><p>Best Rolls <br /> {bestRolls}</p></div>
        <div className='best-rolls'><p>Best Time <br /> {0}</p></div>
      </div>
    </>
  );
}

export default App;