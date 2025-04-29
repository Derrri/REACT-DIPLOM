import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import close from "../../../../assets/close.png";

const AddSeance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { films, halls, seances } = location.state || {};


  const selectedFilmIdFromState =
    location.state?.selectedFilmId || films[0]?.id;
  const selectedHallIdFromState =
    location.state?.selectedHallId || halls[0]?.id;

  const [selectedFilmId, setSelectedFilmId] = React.useState(
    selectedFilmIdFromState
  );
  const [selectedHallId, setSelectedHallId] = React.useState(
    selectedHallIdFromState
  );
  const [selectedTime, setSelectedTime] = React.useState("00:00");

  if (!films || !halls) {
    return <div>Ошибка: данные о фильмах или залах отсутствуют.</div>;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedFilm = films.find((film) => film.id === selectedFilmId);
    const filmDuration = selectedFilm?.film_duration;

    if (filmDuration === undefined || !selectedTime) {
      alert("Ошибка: Длительность фильма или время начала сеанса не выбрано.");
      return;
    }

    const startTimeInMinutes = getTimeInMinutes(selectedTime);
    const totalDurationInMinutes = startTimeInMinutes + filmDuration;

    if (totalDurationInMinutes > 1439) {
      alert("Ошибка: Время окончания сеанса не должно превышать 23:59.");
      return;
    }

    const endTime = calculateEndTime(selectedTime, filmDuration);
    if (isTimeOverlapping(selectedTime, endTime, selectedHallId)) {
      alert("Время сеанса пересекается с существующими сеансами в этом зале.");
      return;
    }

    const newSeance = {
      seance_filmid: selectedFilmId,
      seance_hallid: selectedHallId,
      seance_time: selectedTime,
    };

    localStorage.setItem("newSeance", JSON.stringify(newSeance));
    navigate(-1);
  };

  const getTimeInMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(
      2,
      "0"
    )}`;
  };

  const isTimeOverlapping = (start, end, hallId) => {
    const hallSeances = seances.filter(
      (seance) => seance.seance_hallid === Number(hallId)
    );
    return hallSeances.some((seance) => {
      const seanceFilmDuration = films.find(
        (film) => film.id === seance.seance_filmid
      )?.film_duration;
      if (seanceFilmDuration === undefined) return false;

      const seanceEndTime = calculateEndTime(
        seance.seance_time,
        seanceFilmDuration
      );
      return start < seanceEndTime && seance.seance_time < end;
    });
  };

  return (
    <div className="popup__container">
      <div className="popup__header">
        <h2 className="popup__header_text">Добавление сеанса</h2>
        <div className="popup__close" onClick={() => navigate(-1)}>
          <img src={close} alt="Кнопка 'Закрыть окно'" />
        </div>
      </div>
      <form
        className="popup__form popup__form_add-seance"
        onSubmit={handleSubmit}
      >
        <label className="admin_label add-seance_label">
          Название фильма
          <select
            className="select__add-seance select__add-seance_movie"
            value={selectedFilmId}
            onChange={(e) => setSelectedFilmId(Number(e.target.value))}
          >
            {films.map((film) => (
              <option
                className="option_add-seance hall__name"
                key={film.id}
                value={film.id}
              >
                {film.film_name}
              </option>
            ))}
          </select>
        </label>
        <label className="admin_label add-seance_label">
          Название зала
          <select
            className="select__add-seance select__add-seance_hall"
            value={selectedHallId}
            onChange={(e) => setSelectedHallId(Number(e.target.value))}
          >
            {halls.map((hall) => (
              <option
                className="option_add-seance movie__name"
                key={hall.id}
                value={hall.id}
              >
                {hall.hall_name}
              </option>
            ))}
          </select>
        </label>
        <label className="admin_label add-seance_label" id="seance_time">
          Время начала
          <input
            className="admin_input add-seans__input_time"
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          />
        </label>
        <div className="popup__buttons">
          <button
            className="popup__button_save popup__add-seance_button_add button"
            type="submit"
          >
            Добавить
          </button>
          <button
            className="popup__button_cancel popup__add-seance_button_cancel button"
            type="reset"
            onClick={() => navigate(-1)}
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSeance;
