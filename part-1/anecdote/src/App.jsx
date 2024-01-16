import { useState } from 'react';
import Button from './Button';
import Points from './Points';
import Anecdote from './Anecdote';

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];


  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const randomNumber = function () {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const handleRandomAnecdote = function () {
    let newRandomNumber = randomNumber();
    if (newRandomNumber === selected) {
      newRandomNumber = randomNumber();
    }
    setSelected(newRandomNumber);
  };

  const handleAnecdoteVote = function () {
    const updatedPoints = [...points];
    updatedPoints[selected] += 1;
    setPoints(updatedPoints);
  };

  // Find the index of the anecdote with the most votes
  const mostVotesIndex = points.indexOf(Math.max(...points));

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdotes={anecdotes} anecdoteIndex={selected} />
      <Points points={points} anecdoteIndex={selected} />


      <h2>Anecdote with most votes</h2>
      <Anecdote anecdotes={anecdotes} anecdoteIndex={mostVotesIndex} />
      <Points points={points} anecdoteIndex={mostVotesIndex} />

      <Button handleClick={handleAnecdoteVote} text="vote" />
      <Button handleClick={handleRandomAnecdote} text="next anecdote" />
    </div>
  );
}

export default App;
