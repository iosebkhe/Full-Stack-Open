import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filteredAnecdotes = filter
      ? [...anecdotes].filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      : [...anecdotes];

    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  });


  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };


  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={vote}
          />
        )
      }
    </div>
  );
};

export default AnecdoteList;