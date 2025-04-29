import React from "react";
import "./MovieCard.css";

const MovieCard = ({ film, seances, halls, selectedDate, onSeanceSelect }) => {
  const currentTime = new Date();
  const seancesByHall = seances.reduce((acc, seance) => {
    const hallId = seance.seance_hallid;
    acc[hallId] = acc[hallId] || [];
    acc[hallId].push(seance);
    return acc;
  }, {});

  const handleTimeClick = (seance) => {
    onSeanceSelect(seance);
  };

  return (
    <section className="movie-card">
      <div className="movie-card__info-container">
        <div className="movie-card__poster">
          <img src={film.film_poster} alt={film.film_name} className="movie-card__poster" />
        </div>
        <div className="movie-card__details">
          <h2 className="movie-card__title">{film.film_name}</h2>
          <p className="movie-card__description">{film.film_description}</p>
          <span className="movie-card__duration">{film.film_duration} минут </span>
          <span className="movie-card__origin">{film.film_origin}</span>
        </div>
      </div>
      <div className="seance-times">
        {halls.map((hall) => {
          const filmSeances = (seancesByHall[hall.id] || []).filter(
            (seance) => seance.seance_filmid === film.id
          );
          if (filmSeances.length > 0) {
            filmSeances.sort((a, b) => {
              const timeA = a.seance_time.split(":").map(Number);
              const timeB = b.seance_time.split(":").map(Number);
              return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
            });
            return (
              <div className="seance-times__container" key={hall.id}>
                <h3 className="seance-times__hall">{hall.hall_name}</h3>
                <ul className="seance-times__list">
                  {filmSeances.map((seance) => {
                    const seanceDate = new Date(selectedDate);
                    const [hours, minutes] = seance.seance_time.split(":").map(Number);
                    seanceDate.setHours(hours, minutes);
                    const isPast = seanceDate < currentTime;
                    return (
                      <li
                        key={seance.id}
                        className={`seance-times__time ${isPast ? " seance-times__time--disabled" : ""}`}
                        onClick={() => !isPast && handleTimeClick(seance)}
                      >{seance.seance_time}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};

export default MovieCard;
