import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreateUrl from "./Create";
import UrlTable from "./UrlTable";
import Login from "./Login";  
import Register from "./Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7028/api/account/me", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate("/shorturls");
  };



  return (
    <div>
      

      <Routes>
        {/* Login Route */}
        <Route 
          path="/login" 
          element={<Login onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* Registration Route */}
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/shorturls" element={<UrlTable />} />
            <Route path="/shorturls/create" element={<CreateUrl />} />
          </>
        ) : (
          <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
