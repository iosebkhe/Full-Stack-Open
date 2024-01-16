import StatisticsLine from "./StatisticsLine";

const Statistics = function (props) {
  return (
    <table>
      <tbody>

        <StatisticsLine value={props.good} text="good" />
        <StatisticsLine value={props.neutral} text="neutral" />
        <StatisticsLine value={props.bad} text="bad" />
        <StatisticsLine value={props.all} text="all" />
        <StatisticsLine value={props.handleAverageFeedback} text="average" />
        <StatisticsLine value={props.handlePositiveFeedback} text="positive" />
      </tbody>
    </table>);
};

export default Statistics;