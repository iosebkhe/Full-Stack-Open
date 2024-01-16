import PropTypes from "prop-types";

const LoginForm = (
  {
    username,
    password,
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange
  }
) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          username
          <input type="text"
            name="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input type="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleUsernameChange: PropTypes.func,
  handlePasswordChange: PropTypes.func
};

export default LoginForm;