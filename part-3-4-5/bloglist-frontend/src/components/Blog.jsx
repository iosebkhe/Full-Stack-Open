import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, user, updateBlog, deleteBLog }) => {
  const [fullBlogVisible, setFullBlogVisible] = useState(false);
  // const [hasLiked, setHasLiked] = useState(false);

  const handleBlogVisibility = () => {
    setFullBlogVisible(!fullBlogVisible);
  };

  const handleBlogUpdate = (event) => {
    event.preventDefault();
    // const updatedLikes = hasLiked ? blog.likes - 1 : blog.likes + 1;

    const updatedBlog = {
      ...blog,
      likes: blog?.likes + 1
    };

    updateBlog(blog.id, updatedBlog);
    // setHasLiked(!hasLiked);
  };

  const buttonText = fullBlogVisible ? "hide" : "view";
  // const likeBtnText = hasLiked ? "unlike" : "like";

  const deleteBlogHandler = (event) => {
    event.preventDefault();

    const confirmed = confirm(`Remove blog ${blog.title} by ${blog.author}`);

    if (confirmed) {
      deleteBLog(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const loggedInUserIsCreator = user && blog.user && user.id === blog.user.id;


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleBlogVisibility}>{buttonText}</button>
      {fullBlogVisible &&
        <div>
          <p>
            <a target="_blank" rel="noreferrer" href={blog.url}>
              {blog.url}
            </a>
          </p>
          <p>
            <span className="likesText">
              likes {blog.likes}
            </span>
            <button name="likeButton" onClick={handleBlogUpdate}>like</button>
          </p>
          <p>
            {user.name}
          </p>
        </div>}
      <div>
        {loggedInUserIsCreator && (
          <div>
            <button onClick={deleteBlogHandler}>remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object,
  updateBlog: PropTypes.func,
  deleteBLog: PropTypes.func
};

export default Blog;