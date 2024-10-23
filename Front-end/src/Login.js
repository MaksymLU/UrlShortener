import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://localhost:7028/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password }),
      credentials: "include",  // Для зберігання кукі
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Невірні дані для входу");
        }
      })
      .then(() => {
        onLoginSuccess();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const goToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Увійти</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Логін</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-custom" style={{ marginBottom: '10px' }}>Увійти</button>
      </form>

      <button onClick={goToRegisterPage} className="btn-custom mt-3">
        Реєстрація
      </button>
    </div>
  );
};

export default Login;