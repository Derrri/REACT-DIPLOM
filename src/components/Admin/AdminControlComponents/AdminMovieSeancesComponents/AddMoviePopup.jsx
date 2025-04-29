import React, { useState, useContext } from "react";
import close from "../../../../assets/close.png";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../DataContext";

const AddMoviePopup = () => {
  const navigate = useNavigate();
  const { addMovie } = useContext(DataContext);
  const [movieData, setMovieData] = useState({
    movie_name: "",
    movie_time: "",
    movie_synopsis: "",
    movie_country: "",
    file: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "file") {
      setMovieData({ ...movieData, [name]: files[0] });
    } else {
      setMovieData({ ...movieData, [name]: value });
    }

    if (name === "movie_time" && value < 0) {
      alert("Продолжительность фильма не может быть отрицательной!");
      setMovieData({ ...movieData, movie_time: "" });
    }
  };

  const handleAddMovieClick = async (event) => {
    event.preventDefault();
    try {
      await addMovie(movieData);
      navigate(-1);
    } catch (error) {
      console.error("Ошибка при добавлении фильма:", error);
    }
  };

  return (
    <div className="popup popup__movie_add">
      <div className="popup__container">
        <div className="popup__header">
          <h2 className="popup__header_text">Добавление фильма</h2>
          <div className="popup__close" onClick={() => navigate(-1)}>
            <img src={close} alt="Кнопка Закрыть окно" />
          </div>
        </div>
        <form
          className="popup__form popup__form_add-movie"
          onSubmit={handleAddMovieClick}
        >
          <label className="admin_label add-movie_label">
            Название фильма
            <input
              type="text"
              name="movie_name"
              className="admin_input add-movie_name_input"
              placeholder="Например, «Гражданин Кейн»"
              required
              onChange={handleChange}
            />
          </label>
          <label className="admin_label add-movie_label">
            Продолжительность фильма (мин.)
            <input
              type="number"
              name="movie_time"
              className="admin_input add-movie_time_input"
              min="0"
              required
              onChange={handleChange}
            />
          </label>
          <label className="admin_label add-movie_label">
            Описание фильма
            <textarea
              name="movie_synopsis"
              className="admin_input add-movie_synopsis_input"
              required
              onChange={handleChange}
            />
          </label>
          <label className="admin_label add-movie_label">
            Страна
            <input
              type="text"
              name="movie_country"
              className="admin_input add-movie_country_input"
              required
              onChange={handleChange}
            />
          </label>
          <div className="popup__buttons">
            <button
              className="popup__button_save popup__add-movie_button button"
              type="submit"
            >
              Добавить фильм
            </button>
            <label className="popup__button_save popup__add-poster_button button">
              Загрузить постер
              <input
                type="file"
                name="file"
                accept=".png"
                className="input_add_poster"
                onChange={handleChange}
                required
              />
            </label>
            <button
              className="popup__button_cancel popup__add-movie_button_cancel button"
              type="button"
              onClick={() => navigate(-1)}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePopup;
