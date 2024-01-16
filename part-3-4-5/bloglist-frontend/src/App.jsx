import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import AddBlogForm from './components/AddBlogForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import Notification from './components/Notification';
import Togglable from './components/Togglable.jsx';
import blogService from './services/blogs';
import logInService from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user !== null) {
        try {
          const fetchedBlogs = await blogService.getAll();
          setBlogs(fetchedBlogs);
          blogService.setToken(user.token);
        } catch (error) {
          setMessage(error.response.data.error);
          setMessageType("error");
        }
      }
    };
    fetchBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("blogListLoggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const clearNotification = () => {
    setMessage(null);
    setMessageType(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await logInService.logIn({ username, password });
      localStorage.setItem("blogListLoggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(`${user.name} logged in successfully.`);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response.data.error);
      setMessageType("error");
    }
  };

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("blogListLoggedUser");
      setUser(null);
      setMessage(`${user.name} logged out successfully.`);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response.data.error);
      setMessageType("error");
    }
  };

  const addBlog = async (newBlogObject) => {
    try {
      const returnedBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(returnedBlog));
      setMessage(`A new Blog ${returnedBlog.title} by ${returnedBlog.author} is added`);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response.data.error);
      setMessageType("error");
    }
  };

  const updateBlog = async (id, updatedBlogObject) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlogObject);
      const newBlogs = blogs.map(blog => blog.id !== id ? blog : returnedBlog);
      setBlogs(newBlogs);
    } catch (error) {
      setMessage(error.response.data.error);
      setMessageType("error");
    }
  };

  const handleBlogDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const newBlogs = blogs.filter(blog => blog.id !== id);
      setBlogs(newBlogs);
      setMessage("Blog deleted");
      setMessageType("success");
    } catch (error) {
      setMessage(error.response.data.error);
      setMessageType("error");
    }
  };

  const sortAndRenderBlog = () => {
    return blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog =>
      <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBLog={handleBlogDelete} />
    );
  };

  return (
    <div>
      {user === null
        ?
        <div>
          <Notification
            text={message}
            notificationType={messageType}
            clearNotification={clearNotification}
          />

          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={(e) => setUsername(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)}
          />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification
            text={message}
            notificationType={messageType}
            clearNotification={clearNotification}
          />
          <div>
            {user.name} logged in<button onClick={handleLogOut}>log out</button>
          </div>
          <div>
            <Togglable buttonLabel="new blog">
              <AddBlogForm createBlog={addBlog} />
            </Togglable>
          </div>
          {sortAndRenderBlog()}
        </div>}
    </div>
  );
};

export default App;