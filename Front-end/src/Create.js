import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Create.css';

const CreateUrl = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://localhost:7028/api/shorturls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage) {
          setErrorMessage(data.errorMessage);
          setShortenedUrl("");
        } else {
          setShortenedUrl(`${window.location.origin}/${data.shortenedUrl}`);
          setErrorMessage("");
        }
      })
      .catch((error) => {
        setErrorMessage("Сталася помилка при створенні URL");
        setShortenedUrl("");
      });
  };

  const goToTablePage = () => {
    navigate('../shorturls');
  };

  return (
    <div className="form-container">
      <h2>Скоротити URL</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="originalUrl">Оригінальний URL</label>
          <input
            type="text"
            id="originalUrl"
            className="form-control"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-custom" style={{ marginBottom: '10px' }}>Скоротити</button>
      </form>

      {shortenedUrl && (
        <div className="alert alert-success mt-3">
          <strong>Скорочений URL:</strong>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}

      <button onClick={goToTablePage} className="btn-custom mt-3">
        Перейти до списку URL
      </button>
    </div>
  );
};

export default CreateUrl;
