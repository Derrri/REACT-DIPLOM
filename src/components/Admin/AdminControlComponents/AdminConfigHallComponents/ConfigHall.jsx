import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../DataContext";
import HallList from "../HallList";
import SaveResetButtons from "../SaveResetButtons";

const ConfigHall = () => {
  const { halls, saveHallConfigAdmin, fetchData } = useContext(DataContext);
  const [selectedHall, setSelectedHall] = useState(
    halls.length > 0 ? halls[0].id : null
  );
  const [rows, setRows] = useState(10);
  const [places, setPlaces] = useState(8);
  const [hallConfig, setHallConfig] = useState([]);
  const [originalHallConfig, setOriginalHallConfig] = useState([]);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (halls.length > 0) {
      handleHallClick(halls[0]);
    }
  }, [halls]);

  const handleRowsChange = (e) => {
    const newRowCount = Number(e.target.value);
    setRows(newRowCount);
    setIsModified(true);
    const newHallConfig = Array.from({ length: newRowCount }, (_, i) =>
      hallConfig[i] ? [...hallConfig[i]] : Array(places).fill("standart")
    );
    setHallConfig(newHallConfig);
  };

  const handlePlacesChange = (e) => {
    const newPlaceCount = Number(e.target.value);
    setPlaces(newPlaceCount);
    setIsModified(true);
    const newHallConfig = hallConfig.map((row) =>
      Array.from({ length: newPlaceCount }, (_, j) =>
        row[j] !== undefined ? row[j] : "standart"
      )
    );
    setHallConfig(newHallConfig);
  };

  const handleHallClick = (hall) => {
    setSelectedHall(hall.id);
    setRows(hall.hall_rows);
    setPlaces(hall.hall_places);
    setHallConfig(hall.hall_config.map((row) => [...row]));
    setOriginalHallConfig(hall.hall_config.map((row) => [...row]));
    setIsModified(false);
  };

  const toggleChairType = (rowIndex, chairIndex) => {
    const newConfig = [...hallConfig];
    const currentType = newConfig[rowIndex][chairIndex];
    newConfig[rowIndex][chairIndex] =
      currentType === "standart"
        ? "vip"
        : currentType === "vip"
        ? "disabled"
        : "standart";
    setHallConfig(newConfig);
    setIsModified(true);
  };

  const renderSeating = () => {
    const seatingArrangement = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < places; j++) {
        const type =
          hallConfig[i] && hallConfig[i][j] ? hallConfig[i][j] : "standart";
        row.push(
          <span
            key={j}
            className={`hall-config__hall_chair place_${type}`}
            onClick={() => toggleChairType(i, j)}
          ></span>
        );
      }
      seatingArrangement.push(
        <div key={i} className="hall-config__hall_row">
          {row}
        </div>
      );
    }
    return seatingArrangement;
  };

  const handleReset = () => {
    if (selectedHall) {
      setHallConfig(originalHallConfig.map((row) => [...row]));
      setRows(halls.find((hall) => hall.id === selectedHall).hall_rows);
      setPlaces(halls.find((hall) => hall.id === selectedHall).hall_places);
    }
    setIsModified(false);
  };

  const handleSave = () => {
    const arrayConfig = hallConfig.map((row) => [...row]);
    const hallId = selectedHall;
    const rowCount = rows;
    const placeCount = places;
    saveHallConfigAdmin(hallId, rowCount, placeCount, arrayConfig);
    fetchData();
  };
  return (
    <>
      <p className="admin__info">Выберите зал для конфигурации:</p>
      <ul className="halls_choose hall-config__list">
        <HallList
          halls={halls}
          selectedHall={selectedHall}
          onHallClick={handleHallClick}
          itemClassName="hall__item hall-config__item"
        />
      </ul>
      <div className="hall-config__wrapper">
        <p className="admin__info">
          Укажите количество рядов и максимальное количество мест в ряду:
        </p>
        <form className="hall-config__size">
          <label className="hall-config__size_rows admin_label">
            Рядов, шт
            <input
              type="number"
              className="admin_input hall-config__rows"
              value={rows}
              min="1"
              max="15"
              onChange={handleRowsChange}
            />
          </label>
          <p className="hall-size">x</p>
          <label className="hall-config__size_places admin_label">
            Мест, шт
            <input
              type="number"
              className="admin_input hall-config__places"
              value={places}
              min="1"
              max="15"
              onChange={handlePlacesChange}
            />
          </label>
        </form>
        <p className="admin__info">
          Теперь вы можете указать типы кресел на схеме зала:
        </p>
        <div className="hall-config__types">
          <div className="hall-config__type_place">
            <span className="place_standart"></span> — обычные кресла
          </div>
          <div className="hall-config__type_place">
            <span className="place_vip"></span> — VIP кресла
          </div>
          <div className="hall-config__type_place">
            <span className="place_disabled"></span> — заблокированные (нет
            кресла)
          </div>
        </div>
        <p className="hall-config__hint">
          Чтобы изменить вид кресел, нажмите по нему
        </p>
        <div className="hall-config__hall">
          <div className="hall-config__hall_screen">экран</div>
          <div className="hall-config__hall_wrapper">{renderSeating()}</div>
        </div>
        <div className="hall-config__buttons">
          <SaveResetButtons
            onReset={handleReset}
            onSave={handleSave}
            isModified={isModified}
            itemClassNameSave="admin__button_save hall-config__button_save"
            itemClassNameReset="admin__button_cancel hall-config__button_cancel"
          />
        </div>
      </div>
    </>
  );
};

export default ConfigHall;
