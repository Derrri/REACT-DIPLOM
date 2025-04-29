import React from "react";

import "./AdminWrapper.css";

const AdminWrapper = ({ children }) => {
  return (
    <div className="admin__container">
      <header className="header header__admin">
        <h1 className="header__logo">
          Идём
          <span className="header__logo_letter">В</span>
          КИНО
        </h1>
        <p className="header__subtitle">Администраторррская</p>
      </header>

      {children}
    </div>
  );
};

export default AdminWrapper;
