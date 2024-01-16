import { useState } from 'react';
import Statistics from './Statistics';
import Button from './Button';

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedbacks, setAllFeedbacks] = useState(0);

  // handleGood
  const handleGoodFeedback = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setAllFeedbacks(updatedGood + neutral + bad);
  };

  //handle neutral
  const handleNeutralFeedback = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setAllFeedbacks(good + updatedNeutral + bad);
  };

  //handle bad
  const handleBadFeedback = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAllFeedbacks(good + neutral + updatedBad);
  };

  const handlePositiveFeedback = (good / allFeedbacks) * 100;
  const handleAverageFeedback = (good - bad) / allFeedbacks;


  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodFeedback} text="good" />
      <Button handleClick={handleNeutralFeedback} text="neutral" />
      <Button handleClick={handleBadFeedback} text="bad" />

      <h2>statistics</h2>
      {allFeedbacks ?
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={allFeedbacks}
          handleAverageFeedback={handleAverageFeedback}
          handlePositiveFeedback={handlePositiveFeedback}
        />
        : "No statistics given"}
    </div>
  );
}

export default App;
