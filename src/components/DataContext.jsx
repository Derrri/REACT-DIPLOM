import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [halls, setHalls] = useState([]);
  const [films, setFilms] = useState([]);
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://shfe-diplom.neto-server.ru";
  const ALL_DATA_URL = `${BASE_URL}/alldata`;
  const TICKET_URL = `${BASE_URL}/ticket`;
  const LOGIN_URL = `${BASE_URL}/login`;
  const HALL_URL = `${BASE_URL}/hall`;
  const PRICE_URL = `${BASE_URL}/price`;
  const ADDMOVIE_URL = `${BASE_URL}/film`;
  const ADDSEANCE_URL = `${BASE_URL}/seance`;
  const DELETEMOVIE_URL = `${BASE_URL}/film`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(ALL_DATA_URL);
      const data = await response.json();
      if (data.success) {
        setFilms(data.result.films || []);
        setSeances(data.result.seances || []);
        setHalls(data.result.halls || []);
      } else {
        console.error("Ошибка загрузки данных:", data.message);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchHallConfig = async (seanceId, date) => {
    try {
      const response = await fetch(
        `${BASE_URL}/hallconfig?seanceId=${seanceId}&date=${date}`
      );
      const data = await response.json();
      if (data.success) {
        return data.result;
      } else {
        console.error("Ошибка загрузки конфигурации зала:", data.message);
      }
    } catch (error) {
      console.error("Ошибка при получении конфигурации зала:", error);
    }
  };

  const bookTickets = async (seanceId, ticketDate, tickets) => {
    const formData = new FormData();
    formData.append("seanceId", seanceId);
    formData.append("ticketDate", ticketDate);
    formData.append("tickets", JSON.stringify(tickets));

    try {
      const response = await fetch(TICKET_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        return data.result;
      } else {
        console.error("Ошибка бронирования:", data.message);
        alert("Ошибка бронирования: выберите места для бронирования.");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const loginAdmin = async (login, password) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      if (data.success) {
        return true;
      } else {
        console.error("Ошибка авторизации:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Ошибка во время авторизации:", error);
      return false;
    }
  };

  const addHall = async (hallName) => {
    const params = new FormData();
    params.set("hallName", hallName);

    try {
      const response = await fetch(HALL_URL, {
        method: "POST",
        body: params,
      });
      const data = await response.json();
      await fetchData();
      return data;
    } catch (error) {
      console.error("Ошибка при добавлении зала:", error);
      throw error;
    }
  };

  const removeHall = async (hallId) => {
    try {
      const response = await fetch(`${HALL_URL}/${hallId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка при удалении зала");
      }
      setHalls((prevHalls) => prevHalls.filter((hall) => hall.id !== hallId));
    } catch (error) {
      console.error("Ошибка при удалении зала:", error);
    }
  };

  const saveHallConfigAdmin = async (hallId, rowCount, placeCount, config) => {
    const params = new FormData();
    params.set("rowCount", rowCount.toString());
    params.set("placeCount", placeCount.toString());
    params.set("config", JSON.stringify(config));

    try {
      const response = await fetch(`${HALL_URL}/${hallId}`, {
        method: "POST",
        body: params,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка при сохранении конфигурации зала:", error);
      throw error;
    }
  };

  const savePriceConfig = async (selectedHall, priceStandard, priceVip) => {
    if (!selectedHall) return;

    const params = new FormData();
    params.set("priceStandart", priceStandard);
    params.set("priceVip", priceVip);

    try {
      const response = await fetch(`${PRICE_URL}/${selectedHall}`, {
        method: "POST",
        body: params,
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  };

  const addMovie = async (movieData) => {
    const formData = new FormData();
    formData.append("filmName", movieData.movie_name);
    formData.append("filmDuration", movieData.movie_time);
    formData.append("filmDescription", movieData.movie_synopsis);
    formData.append("filmOrigin", movieData.movie_country);
    formData.append("filePoster", movieData.file);

    try {
      const response = await fetch(`${ADDMOVIE_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении фильма: " + response.statusText);
      }

      const result = await response.json();

      await fetchData();

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const AddSeance = async (newSeance) => {
    const formData = new FormData();
    formData.append("seanceHallid", newSeance.seance_hallid);
    formData.append("seanceFilmid", newSeance.seance_filmid);
    formData.append("seanceTime", newSeance.seance_time);

    try {
      const response = await fetch(`${ADDSEANCE_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении сеанса: " + response.statusText);
      }

      const result = await response.json();

      await fetchData();

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFilm = async (filmId) => {
    try {
      const response = await fetch(`${DELETEMOVIE_URL}/${filmId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFilms((prevFilms) => prevFilms.filter((film) => film.id !== filmId));
        await fetchData();
      } else {
        const errorData = await response.json();
        console.error("Ошибка удаления фильма:", errorData.message);
        alert("Не удалось удалить фильм. Попробуйте позже.");
      }
    } catch (error) {
      console.error("Ошибка при удалении фильма:", error);
      alert("Произошла ошибка при удалении фильма.");
    }
  };

  return (
    <DataContext.Provider
      value={{
        halls,
        setHalls,
        addHall,
        films,
        seances,
        loading,
        fetchHallConfig,
        bookTickets,
        loginAdmin,
        removeHall,
        saveHallConfigAdmin,
        fetchData,
        savePriceConfig,
        addMovie,
        setFilms,
        AddSeance,
        handleRemoveFilm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
