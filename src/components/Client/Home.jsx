import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import HorizontalCalendar from "./HorizontalCalendar";
import "./Home.css";
import { DataContext } from "../DataContext";

const Home = () => {
  const { halls, films, seances, loading } = useContext(DataContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSeanceSelect = (seance, filmId, filmName) => {
    const hall = halls.find((hall) => hall.id === seance.seance_hallid);
    navigate("/Hall", {
      state: {
        selectedDate,
        selectedTime: seance,
        filmId,
        filmName,
        hallName: hall?.hall_name || "Неизвестный зал",
        hallPriceStandard: hall?.hall_price_standart || 0,
        hallPriceVIP: hall?.hall_price_vip || 0,
      },
    });
  };

  const openHalls = halls.filter((hall) => hall.hall_open === 1);

  return (
    <>
      <HorizontalCalendar onDateSelect={setSelectedDate} />
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <main className="movies-list">
          {films.length > 0 ? (
            films.map((film) => {
              const availableSeances = seances.filter(
                (seance) =>
                  seance.seance_filmid === film.id &&
                  openHalls.some((hall) => hall.id === seance.seance_hallid)
              );

              return availableSeances.length > 0 ? (
                <MovieCard
                  key={film.id}
                  film={film}
                  seances={availableSeances}
                  halls={openHalls}
                  selectedDate={selectedDate}
                  onSeanceSelect={(seance) =>
                    handleSeanceSelect(seance, film.id, film.film_name)
                  }
                />
              ) : null;
            })
          ) : (
            <p>Фильмы не найдены.</p>
          )}
        </main>
      )}
    </>
  );
};

export default Home;
