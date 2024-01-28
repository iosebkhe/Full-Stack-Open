import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={(e) => dispatch(filterChange("ALL"))}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={(e) => dispatch(filterChange("IMPORTANT"))}
      />
      not important
      <input
        type="radio"
        name="filter"
        onChange={(e) => dispatch(filterChange("NOT IMPORTANT"))}
      />
    </div>
  );
};

export default VisibilityFilter;