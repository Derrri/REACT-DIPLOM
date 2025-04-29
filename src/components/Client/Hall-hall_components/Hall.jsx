import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../DataContext";
import MovieInfo from "./MovieInfo";
import HallScheme from "./HallScheme";
import Legend from "./Legend";
import "./Hall.css";

const Hall = () => {
  const { fetchHallConfig } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedDate,
    selectedTime,
    filmName,
    hallName,
    hallPriceStandard,
    hallPriceVIP,
  } = location.state;

  const [hallConfigData, setHallConfigData] = useState(null);
  const [selectedChairs, setSelectedChairs] = useState([]);

  useEffect(() => {
    const fetchConfig = async () => {
      if (selectedTime?.id) {
        const configData = await fetchHallConfig(selectedTime.id, selectedDate);
        setHallConfigData(configData);
      }
    };
    fetchConfig();
  }, [fetchHallConfig, selectedTime?.id, selectedDate]);

  const handleChairClick = (rowIndex, chairIndex, chairType) => {
    if (chairType === "disabled" || chairType === "taken") return;
    const chairId = `${rowIndex}-${chairIndex}`;
    setSelectedChairs((prev) =>
      prev.includes(chairId)
        ? prev.filter((chair) => chair !== chairId)
        : [...prev, chairId]
    );
  };

  const handleTicketPurchase = () => {
    const tickets = selectedChairs.map((chairId) => {
      const [rowIndex, chairIndex] = chairId.split("-").map(Number);
      const chairType = hallConfigData[rowIndex][chairIndex];
      const coast = chairType === "vip" ? hallPriceVIP : hallPriceStandard;
      return { row: rowIndex + 1, place: chairIndex + 1, coast: coast };
    });

    navigate("/payment", {
      state: {
        selectedSeanceId: selectedTime.id,
        selectedDate,
        tickets,
        filmName,
        selectedTime: selectedTime.seance_time,
        hallName,
      },
    });
  };

  return (
    <main className="hall buying">
      <section className="buying__info">
        <MovieInfo
          filmName={filmName}
          selectedTime={selectedTime}
          hallName={hallName}
        />
      </section>
      <section className="buying__scheme">
        <div className="buying__scheme_wrapper">
          <HallScheme
            hallConfigData={hallConfigData}
            selectedChairs={selectedChairs}
            handleChairClick={handleChairClick}
          />
        </div>
        <Legend
          hallPriceStandard={hallPriceStandard}
          hallPriceVIP={hallPriceVIP}
        />
      </section>
      <button
        className={`buying__button button ${
          selectedChairs.length > 0 ? "" : "buying__button_disabled"
        }`}
        onClick={handleTicketPurchase}
        disabled={selectedChairs.length === 0}
      >
        Забронировать
      </button>
    </main>
  );
};

export default Hall;

