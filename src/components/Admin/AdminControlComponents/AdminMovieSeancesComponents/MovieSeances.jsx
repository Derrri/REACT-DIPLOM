import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../DataContext";
import deleteimg from "../../../../assets/deleteimg.png";
import close from "../../../../assets/close.png";
import SaveResetButtons from "../SaveResetButtons";

const MovieSeances = () => {
  const { halls, films, seances, setFilms, AddSeance, fetchData } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [localSeances, setLocalSeances] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSeanceId, setSelectedSeanceId] = useState(null);
  const [activeHallId, setActiveHallId] = useState(null);
  const [selectedFilmName, setSelectedFilmName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredSeanceId, setHoveredSeanceId] = useState(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setLocalSeances(seances);
  }, [seances]);

  useEffect(() => {
    const storedSeance = localStorage.getItem("newSeance");
    if (storedSeance) {
      const newSeance = JSON.parse(storedSeance);
      setLocalSeances((prevSeances) => [...prevSeances, newSeance]);
      setIsModified(true);
    }
  }, []);

  const handleRemoveFilm = async (filmId) => {
    try {
      await fetch(`https://shfe-diplom.neto-server.ru/film/${filmId}`, {
        method: "DELETE",
      });
      setFilms((prevFilms) => prevFilms.filter((film) => film.id !== filmId));
      fetchData();
    } catch (error) {
      console.error("Ошибка при удалении фильма:", error);
    }
  };

  const getCycledBackgroundClass = (index) => {
    const cycleNumber = (index % 5) + 1; // Цикл 1-5
    return `background_${cycleNumber}`;
  };

  const handleAddMovieClick = () => {
    navigate("/admin/add-movie");
  };

  const handleSave = async () => {
    const storedSeance = localStorage.getItem("newSeance");
    if (storedSeance) {
      const newSeance = JSON.parse(storedSeance);
      try {
        await AddSeance(newSeance);
        alert("Сеанс успешно добавлен");
        localStorage.removeItem("newSeance");
        setIsModified(false);
      } catch (error) {
        console.error("Ошибка при добавлении сеанса:", error);
      }
    } else {
      alert("Нет новых сеансов для сохранения");
    }
  };

  const handleReset = () => {
    localStorage.removeItem("newSeance");
    setIsModified(false);

    setLocalSeances(seances);
  };

  const handleDrop = (hallId) => (e) => {
    e.preventDefault();
    const filmIdString = e.dataTransfer.getData("filmId");
    const filmId = Number(filmIdString);
    if (filmId) {
      navigate("/admin/add-movie-time", {
        state: {
          selectedFilmId: filmId,
          selectedHallId: hallId,
          seances: localSeances,
          films: films,
          halls: halls,
        },
      });
    }
  };

  const handleDragStart = (seanceId, hallId) => {
    setSelectedSeanceId(seanceId);
    const seance = localSeances.find((s) => s.id === seanceId);
    if (seance) {
      const film = films.find((f) => f.id === seance.seance_filmid);
      if (film) {
        setSelectedFilmName(`"${film.film_name}"`);
      }
    }

    setActiveHallId(hallId);
    setIsDragging(true);
  };

  const handleDeleteDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setShowPopup(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(
        `https://shfe-diplom.neto-server.ru/seance/${selectedSeanceId}`,
        {
          method: "DELETE",
        }
      );
      setLocalSeances((prevSeances) =>
        prevSeances.filter((seance) => seance.id !== selectedSeanceId)
      );
    } catch (error) {
      console.error("Ошибка при удалении сеанса:", error);
    } finally {
      setShowPopup(false);
      setActiveHallId(null);
      fetchData();
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setActiveHallId(null);
    setIsModified(false);
  };

  const calculatePositionAndWidth = (seance) => {
    const dayInMinutes = 24 * 60;
    const [hours, minutes] = seance.seance_time.split(":").map(Number);
    const startSeance = hours * 60 + minutes;
    const film = films.find((film) => film.id === seance.seance_filmid);
    const movieduration = film ? film.film_duration : 0;

    const minWidthPercentage = 5;
    const movieWidth = (movieduration / dayInMinutes) * 100;
    const finalWidth = Math.max(movieWidth, minWidthPercentage);
    const seancePosition = (startSeance / dayInMinutes) * 100;

    const endPosition = seancePosition + finalWidth;
    if (endPosition > 100) {
      const adjustedWidth = 100 - seancePosition;
      return { seancePosition, movieWidth: adjustedWidth };
    }

    return { seancePosition, movieWidth: finalWidth };
  };

  return (
    <>
      <button
        className="admin__button_movie button"
        onClick={handleAddMovieClick}
      >
        Добавить фильм
      </button>
      <div className="movie-seances__wrapper">
        {films.map((film, index) => (
          <div
            className={`movie-seances__movie ${getCycledBackgroundClass(
              index
            )}`}
            key={film.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("filmId", film.id)}
          >
            <img
              src={film.film_poster}
              alt="постер"
              className="movie-seances__movie_poster"
            />
            <div className="movie-seances__movie_info">
              <p className="movie_info-title">{film.film_name}</p>
              <p className="movie_info-length">
                <span className="movie_info-time">{film.film_duration}</span>{" "}
                минут
              </p>
              <span
                className="admin__button_remove movie-seances__movie_delete"
                onClick={() => handleRemoveFilm(film.id)}
              ></span>
            </div>
          </div>
        ))}
      </div>
      <div className="movie-seances__timelines">
        {halls.map((hall) => (
          <section className="movie-seances__timeline" key={hall.id}>
            <div
              className={`timeline__delete ${
                activeHallId === hall.id && isDragging ? "" : "hidden"
              }`}
              onDragOver={handleDeleteDragOver}
              onDrop={handleDeleteDrop}
            >
              <img
                className="timeline__delete_image"
                src={deleteimg}
                alt="Удалить сеанс"
              />
            </div>
            <h3 className="timeline__hall_title">{hall.hall_name}</h3>
            <div
              className="timeline__seances"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop(hall.id)}
            >
              {localSeances
                .filter((seance) => seance.seance_hallid === hall.id)
                .map((seance) => {
                  const { seancePosition, movieWidth } =
                    calculatePositionAndWidth(seance);
                  const filmIndex = films.findIndex(
                    (film) => film.id === seance.seance_filmid
                  );
                  const isHovered = hoveredSeanceId === seance.id;
                  return (
                    <div
                      key={seance.seance_time}
                      className={`timeline__seances_movie ${getCycledBackgroundClass(
                        filmIndex
                      )}`}
                      style={{
                        left: `${seancePosition}%`,
                        width: `${isHovered ? movieWidth + 10 : movieWidth}%`,
                        position: "absolute",
                        transition: "width 0.3s ease",
                        zIndex: isHovered ? 1 : "auto",
                      }}
                      draggable
                      onDragStart={() => handleDragStart(seance.id, hall.id)}
                      onMouseEnter={() => setHoveredSeanceId(seance.id)}
                      onDragEnd={handleDragEnd}
                      onMouseLeave={() => setHoveredSeanceId(null)}
                    >
                      <p className="timeline__seances_title">
                        {
                          films.find((film) => film.id === seance.seance_filmid)
                            ?.film_name
                        }
                      </p>
                      <p
                        className="timeline__movie_start"
                        style={{
                          fontWeight: isHovered ? "bold" : "normal",
                          zIndex: isHovered ? 1 : "auto",
                          transform: isHovered ? "translateX(10px)" : "none",
                          fontSize: isHovered ? "16px" : "12px",
                          bottom: isHovered ? "-43px" : "-30px",
                        }}
                      >
                        {seance.seance_time}
                      </p>
                    </div>
                  );
                })}
            </div>
          </section>
        ))}
      </div>

      <div className="movie-seances__buttons">
        <SaveResetButtons
          onReset={handleReset}
          onSave={handleSave}
          itemClassNameSave="admin__button_save movie-seances__button_save"
          itemClassNameReset="admin__button_cancel movie-seances__button_cancel"
          isModified={isModified}
        />
      </div>

      {showPopup && (
        <div className="popup popup__seance_remove">
          <div className="popup__container">
            <div className="popup__header">
              <h2 className="popup__header_text">Удаление сеанса</h2>
              <div className="popup__close">
                <img
                  src={close}
                  alt="Кнопка 'Закрыть окно'"
                  onClick={handleCancelDelete}
                />
              </div>
            </div>
            <div className="seance-remove_text">
              Вы действительно хотите снять с сеанса фильм{" "}
              <span className="seance-remove_title">{selectedFilmName}</span> ?
            </div>
            <div className="popup__buttons">
              <button
                className="popup__button_save popup__remove-seance_button_delete button"
                onClick={handleConfirmDelete}
              >
                Удалить
              </button>
              <button
                className="popup__button_cancel popup__remove-seance_button_cancel button"
                type="reset"
                onClick={handleCancelDelete}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieSeances;
