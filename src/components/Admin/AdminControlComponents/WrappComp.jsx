import React, { useState } from "react";
import downArrow from "../../../assets/down-arrow.png";

const WrappComp = ({ title, sectionClass, children, isFirst, isLast }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSection = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <section className={`admin__section ${sectionClass}`}>
      <div className="admin__header" onClick={toggleSection}>
        <h2
          className={`admin__header_text ${
            isFirst ? "admin__header_text-first" : ""
          } ${isLast ? "admin__header_text-last" : ""}`}
        >
          {title}
        </h2>
        <img
          src={downArrow}
          alt="Скрыть/раскрыть раздел"
          className={`admin__header_arrow ${
            !isOpen ? "admin__header_arrow-hide" : ""
          }`}
        />
      </div>
      <div className={`admin__wrapper ${!isOpen ? "admin__wrapper-hide" : ""} ${isLast ? 'admin__wrapper-last' : ''}`}>
        {children}
      </div>
    </section>
  );
};

export default WrappComp;
