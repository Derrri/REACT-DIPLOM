import React, { useContext, useState, useEffect } from "react";
import HallList from "../HallList";
import { DataContext } from "../../../DataContext";

const OpenSales = () => {
  const { halls, seances, toggleHallOpenStatus } =
    useContext(DataContext);
  const [selectedHall, setSelectedHall] = useState(null);
  const [buttonText, setButtonText] = useState("");
  const [infoText, setInfoText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (halls.length > 0) {
      setSelectedHall(halls[0].id);
    }
  }, [halls]);

  useEffect(() => {
    if (selectedHall) {
      const hallSeances = seances.filter(
        (seance) => seance.seance_hallid === selectedHall
      );
      if (hallSeances.length === 0) {
        setInfoText("Добавьте сеансы в зал для открытия");
        setIsButtonDisabled(true);
      } else {
        setInfoText("Зал открыт");
        const hall = halls.find((h) => h.id === selectedHall);
        if (hall) {
          setButtonText(
            hall.hall_open === 1
              ? "Приостановить продажу билетов"
              : "Открыть продажу билетов"
          );
          setIsButtonDisabled(false);
          setInfoText(
            hall.hall_open === 0 ? "Всё готово к открытию" : "Зал открыт"
          );
        }
      }
    }
  }, [selectedHall, halls, seances]);

  const handleHallClick = (hall) => {
    setSelectedHall(hall.id);
  };

  const handleButtonClick = () => {
    if (isButtonDisabled || selectedHall === null) {
      return;
    }

    const hall = halls.find((h) => h.id === selectedHall);
    if (!hall) return;

    toggleHallOpenStatus(selectedHall, hall.hall_open).then((data) => {
      if (data.success) {
        alert("Статус зала успешно изменен!");
      } else {
        alert("Ошибка при изменении статуса зала");
      }
    });
  };

  return (
    <>
      <p className="admin__info">Выберите зал для открытия/закрытия продаж:</p>
      <ul className="halls_choose open__list">
        <HallList
          halls={halls}
          selectedHall={selectedHall}
          onHallClick={handleHallClick}
          itemClassName="hall__item open__item"
        />
      </ul>
      <div className="open__wrapper">
        <p className="admin__info open__info">{infoText}</p>
        <button
          className={`admin__button_open button ${
            isButtonDisabled ? "button_disabled" : ""
          }`}
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default OpenSales;
