import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Ticket = () => {
  const location = useLocation();
  const {
    selectedDate,
    selectedTime,
    filmName,
    hallName,
    placesInfo,
    totalCost,
    customMessage,
  } = location.state || {};

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./QRCreator.js";
    script.async = true;
    script.onload = () => {
      console.log("js файл подгрузился");

      const qrcode1 = QRCreator(qrText, {
        mode: -1,
        eccl: 0,
        version: -1,
        mask: -1,
        image: "PNG",
        modsize: 3,
        margin: 3,
      });

      const content = (qrcode) => {
        return qrcode.error
          ? `недопустимые исходные данные ${qrcode.error}`
          : qrcode.result;
      };

      document.getElementById("qrcode1").append(content(qrcode1));
    };
    script.onerror = () => {
      console.error("Ошибка при загрузке скрипта");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const qrText = `
  Дата: ${selectedDate}
  Время: ${selectedTime}
  Фильм: ${filmName}
  Зал: ${hallName}
  Места: ${placesInfo}
  Стоимость: ${totalCost}рублей
  ${customMessage}`;

  console.log("Текст для QR-кода:", qrText);

  return (
    <main className="main">
      <section className="payment__header">
        <h2 className="payment__header-text">Электронный билет</h2>
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
        </div>
        <div className="ticket__info-qr">
          <div id="qrcode1"  aria-label="QR-код для подтверждения бронирования"></div>
        </div>
        <div className="ticket__hint">
          <p className="ticket__hint-text">
            Покажите QR-код нашему контроллеру для подтверждения бронирования.
          </p>
          <p className="ticket__hint-text">Приятного просмотра!</p>
        </div>
      </section>
    </main>
  );
};

export default Ticket;
