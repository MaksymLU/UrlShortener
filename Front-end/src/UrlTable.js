import React, { useState, useEffect } from "react";
import './UrlTable.css';
import { useNavigate } from 'react-router-dom';

const UrlTable = () => {
  const [urls, setUrls] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetch("https://localhost:7028/api/shorturls")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setUrls(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error); 
        setLoading(false); 
      });
  }, []);

  const goToCreateUrl = () => {
    navigate('/shorturls/create');
  };

  return (
    <div>
      <h2>Скорочені URL</h2>
      <button onClick={goToCreateUrl} className="btn-custom">
        Додати новий URL
      </button>

      {loading && <p>Завантаження...</p>} {}
      {error && <p className="error-message">Помилка: {error.message}</p>} {}

      {!loading && !error && (  
        <table className="styled-table">
          <thead>
            <tr>
              <th>Оригінальний URL</th>
              <th>Скорочений URL</th>
              <th>Створено</th>
              <th>Ким створено</th>
            </tr>
          </thead>
          <tbody>
            {urls.length > 0 ? (
              urls.map((item) => (
                <tr key={item.shortCode}>
                  <td className="left-align">{item.originalUrl}</td>
                  <td>
                    <a href={`https://localhost:7028/api/shorturls/${item.shortCode}`} target="_blank" rel="noopener noreferrer">
                      {item.shortCode}
                    </a>
                  </td>
                  <td>{new Date(item.createdDate).toLocaleString()}</td>
                  <td>{item.createdBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Дані не знайдено</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UrlTable;
