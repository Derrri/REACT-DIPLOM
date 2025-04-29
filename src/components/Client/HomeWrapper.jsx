import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./HomeWrapper.css";
import { useNavigate } from "react-router-dom";

const HomeWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginButtonClass, setLoginButtonClass] = useState("login-button");

  const handleLoginClick = () => {
    navigate("/admin/login");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setLoginButtonClass("login-button");
    } else {
      setLoginButtonClass("login-button hidden");
    }
  }, [location.pathname]);

  return (
    <div className="container">
      <header className="header">
        <h1 className="header__logo">
          <Link to="/" className="header__logo_link">
            <span className="bold-text">ИДЁМ</span>
            <span className="header__logo_letter">В</span>
            <span className="bold-text">КИНО</span>
          </Link>
        </h1>
        <button className={loginButtonClass} onClick={handleLoginClick}>
          Войти
        </button>
      </header>
      {children}
    </div>
  );
};

export default HomeWrapper;
