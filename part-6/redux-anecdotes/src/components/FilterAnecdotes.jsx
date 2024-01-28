import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const FilterAnecdotes = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(filterChange(e.target.value));
  };

  return (
    <div>
      filter <input type="text"
        onChange={handleChange} />
    </div>
  );
};

export default FilterAnecdotes;