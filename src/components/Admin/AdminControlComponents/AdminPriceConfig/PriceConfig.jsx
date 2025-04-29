import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../DataContext";
import HallList from "../HallList";
import SaveResetButtons from "../SaveResetButtons";

const PriceConfig = () => {
  const { halls, savePriceConfig, fetchData } = useContext(DataContext);
  const [selectedHall, setSelectedHall] = useState(null);
  const [standardPrice, setStandardPrice] = useState(100);
  const [vipPrice, setVipPrice] = useState(350);
  const [originalStandardPrice, setOriginalStandardPrice] = useState(100);
  const [originalVipPrice, setOriginalVipPrice] = useState(350);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (halls.length > 0) {
      setSelectedHall(halls[0].id);
    }
  }, [halls]);

  useEffect(() => {
    if (selectedHall) {
      const hall = halls.find((h) => h.id === selectedHall);
      if (hall) {
        setStandardPrice(hall.hall_price_standart);
        setVipPrice(hall.hall_price_vip);
        setOriginalStandardPrice(hall.hall_price_standart);
        setOriginalVipPrice(hall.hall_price_vip);
        setIsModified(false);
      }
    }
  }, [selectedHall, halls]);

  const handleHallClick = (hall) => {
    setSelectedHall(hall.id);
  };

  const handleReset = () => {
    setStandardPrice(originalStandardPrice);
    setVipPrice(originalVipPrice);
    setIsModified(false);
  };

  const handleSave = async () => {
    try {
      await savePriceConfig(selectedHall, standardPrice, vipPrice);
      setOriginalStandardPrice(standardPrice);
      setOriginalVipPrice(vipPrice);
      setIsModified(false);
      fetchData();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handlePriceChange = (type, value) => {
    const numericValue = Number(value);
    const priceUpdates = {
      standard: setStandardPrice,
      vip: setVipPrice,
    };
    if (priceUpdates[type]) {
      priceUpdates[type](numericValue);
    }
    setIsModified(true);
  };

  return (
    <>
      <p className="admin__info">Выберите зал для конфигурации:</p>
      <ul className="halls_choose price-config__list">
        <HallList
          halls={halls}
          selectedHall={selectedHall}
          onHallClick={handleHallClick}
          itemClassName="hall__item price-config__item"
        />
      </ul>
      <div className="price-config__wrapper">
        <p className="admin__info">Установите цены для типов кресел:</p>
        <form className="price-config__form">
          <div className="price-config__legend">
            <label className="admin_label price-config__label">
              Цена,рублей
              <input
                type="number"
                className="admin_input price-config__input_standart"
                value={standardPrice}
                min="0"
                onChange={(e) => handlePriceChange("standard", e.target.value)}
              />
            </label>
            <p className="price-config__legend_text">
              {" "}
              за <span className="price-config__chair place_standart"></span>{" "}
              обычные кресла
            </p>
          </div>
          <div className="price-config__legend">
            <label className="admin_label price-config__label">
              Цена,рублей
              <input
                type="number"
                className="admin_input price-config__input_vip"
                value={vipPrice}
                min="0"
                onChange={(e) => handlePriceChange("vip", e.target.value)}
              />
            </label>
            <p className="price-config__legend_text">
              {" "}
              за <span className="price-config__chair place_vip"></span> VIP
              кресла
            </p>
          </div>
        </form>
        <div className="price-config__buttons">
          <SaveResetButtons
            isModified={isModified}
            onReset={handleReset}
            onSave={handleSave}
            itemClassNameSave="admin__button_save price-config__button_save"
            itemClassNameReset="admin__button_cancel price-config__button_cancel"
          />
        </div>
      </div>
    </>
  );
};

export default PriceConfig;
