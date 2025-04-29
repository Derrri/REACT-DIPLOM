import React, { useState, useContext } from "react";
import "./AddHallPopup.css"
import close from "../../../../assets/close.png";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../DataContext";

const AddHallPopup = () => {
    const [hallName, setHallName] = useState('');
    const { addHall } = useContext(DataContext);
    const navigate = useNavigate();

    const handleAddHall = async (event) => {
      event.preventDefault();
      try {
          await addHall(hallName);
          navigate('/admin/control-center');
      } catch (error) {
          console.error('Ошибка при добавлении зала:', error);
      }
  };

    return (
        <div className="popup popup__hall_add">
            <div className="popup__container">
                <div className="popup__header">
                    <h2 className="popup__header_text">Добавление зала</h2>
                    <div className="popup__close" onClick={() => navigate('/admin/control-center')}>
                        <img src={close} alt="Кнопка Закрыть окно" />
                    </div>
                </div>
                <form className="popup__form popup__form_add-hall" onSubmit={handleAddHall}>
                    <label className="admin_label add-hall_label">
                        Название зала
                        <input
                            type="text"
                            className="admin_input add-hall_input"
                            placeholder="Например, «Зал 1»"
                            required
                            value={hallName}
                            onChange={(e) => setHallName(e.target.value)}
                        />
                    </label>
                    <div className="popup__buttons">
                        <button className="popup__button_save popup__add-hall_button_add button" type="submit">Добавить зал</button>
                        <button className="popup__button_cancel popup__add-hall_button_cancel button" type="button" onClick={() => navigate('/admin/control-center')}>Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHallPopup;