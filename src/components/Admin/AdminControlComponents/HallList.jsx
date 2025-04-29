import React from "react";

const HallList = ({ halls, selectedHall, onHallClick, itemClassName }) => {
  return halls.map((hall) => (
    <li
      key={hall.id}
      className={`${itemClassName} ${
        selectedHall === hall.id ? "hall_item-selected" : ""
      }`}
      onClick={() => onHallClick(hall)}
    >
      {hall.hall_name}
    </li>
  ));
};

export default HallList;
