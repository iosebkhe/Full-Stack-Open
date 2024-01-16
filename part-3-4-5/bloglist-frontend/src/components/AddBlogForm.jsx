import PropTypes from "prop-types";
import { useState } from "react";

const AddBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");


  const addNewBlog = (event) => {
    event.preventDefault();


    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input type="text"
            placeholder="write title here"
            name="Title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input type="text"
            placeholder="write author here"
            name="Author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>

        <div>
          url:
          <input type="text"
            placeholder="write url here"
            name="Url"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

AddBlogForm.propTypes = {
  createBlog: PropTypes.func
};

export default AddBlogForm;