import PropTypes from "prop-types";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>);
};

Course.propTypes = {
  course: PropTypes.object
};

export default Course;