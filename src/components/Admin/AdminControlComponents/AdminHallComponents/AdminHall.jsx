import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../DataContext";
import "./AdminHall.css";

const AdminHall = () => {
  const { halls, loading, removeHall } = useContext(DataContext);
  const navigate = useNavigate();

  if (loading) return <p>Загрузка...</p>;

  const handleRemoveHall = (hallId) => {
    removeHall(hallId);
  };

  const handleCreateHallClick = () => {
    navigate("/admin/add-hall");
  };

  return (
    <>
      <p className="admin__info halls__info">Доступные залы:</p>
      <ul className="halls__list">
        {halls.map((hall) => (
          <li key={hall.id} className="halls__list_item">
            <span className="halls__list_name">{hall.hall_name}</span>
            <span
              className="admin__button_remove hall_remove"
              onClick={() => handleRemoveHall(hall.id)}
            ></span>
          </li>
        ))}
      </ul>
      <button
        className="admin__button_hall button"
        onClick={handleCreateHallClick}
      >
        Создать зал
      </button>
    </>
  );
};

export default AdminHall;
