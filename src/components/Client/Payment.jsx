import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedSeanceId,
    selectedDate,
    tickets,
    filmName,
    selectedTime,
    hallName,
  } = location.state || {};
  const totalCost = tickets
    ? tickets.reduce((sum, ticket) => sum + ticket.coast, 0)
    : 0;
  const placesInfo =
    Array.isArray(tickets) && tickets.length > 0
      ? tickets
          .map((ticket) => `"Ряд: ${ticket.row}, Место: ${ticket.place}"`)
          .join(", ") + "."
      : "";
  const customMessage = "Билет действителен строго на свой сеанс";
  const { bookTickets } = useContext(DataContext);

  const handleBooking = async () => {
    await bookTickets(selectedSeanceId, selectedDate, tickets);
    navigate("/ticket", {
      state: {
        selectedDate,
        selectedTime,
        filmName,
        hallName,
        placesInfo,
        totalCost,
        customMessage,
        tickets,
      },
    });
  };

  return (
    <main className="main">
      <section className="payment__header">
        <h2 className="payment__header-text">Вы выбрали билеты:</h2>
      </section>
      <section className="ticket__info-wrapper">
        <div className="ticket__info">
          <p className="ticket__info-text">
            На фильм:{" "}
            <span className="ticket__info-movie ticket__info-bold">
              {filmName}
            </span>
          </p>
          <p className="ticket__info-text">
            Места:{" "}
            <span className="ticket__info-places ticket__info-bold">
              {placesInfo}
            </span>
          </p>
          <p className="ticket__info-text">
            В зале:{" "}
            <span className="ticket__info-hall ticket__info-bold">
              {hallName}
            </span>
          </p>
          <p className="ticket__info-text">
            Начало сеанса:{" "}
            <span className="ticket__info-time ticket__info-bold">
              {selectedTime}
            </span>
          </p>
          <p className="ticket__info-text">
            Стоимость:{" "}
            <span className="ticket__info-price ticket__info-bold">
              {totalCost}
            </span>{" "}
            рублей.
          </p>
        </div>
        <button className="ticket__button button" onClick={handleBooking}>
        Получить код бронирования
        </button>
        <div className="ticket__hint">
          <p className="ticket__hint-text">
            После оплаты билет будет доступен в этом окне, а также придет вам на
            почту. Покажите QR-код нашему контроллеру у входа в зал.
          </p>
          <p className="ticket__hint-text">Приятного просмотра!</p>
        </div>
      </section>
    </main>
  );
};

export default Payment;
