import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Паролі не збігаються");
      return;
    }

    fetch("https://localhost:7028/api/account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword, role }),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/login');
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Помилка реєстрації");
          });
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="register-container">
      <h2>Реєстрація</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Підтвердження пароля</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Роль</label>
          <select
            id="role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn-custom">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;