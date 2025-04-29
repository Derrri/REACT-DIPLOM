import React, { useEffect, useState } from "react";
import "./HorizontalCalendar.css";

const daysOfWeek = ["Вс,", "Пн,", "Вт,", "Ср,", "Чт,", "Пт,", "Сб,"];

const HorizontalCalendar = ({ onDateSelect }) => {
  const [calendarDates, setCalendarDates] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [currentStartDate, setCurrentStartDate] = useState(new Date());

  useEffect(() => {
    updateCalendarDates();
  }, [currentStartDate]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const updateCalendarDates = () => {
    const newDates = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentStartDate);
      date.setDate(currentStartDate.getDate() + i);
      return {
        day: daysOfWeek[date.getDay()],
        date: date.getDate(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isToday: date.toDateString() === new Date().toDateString(),
      };
    });

    setCalendarDates(newDates);

    const todayDate = newDates.find((d) => d.isToday);
    setSelectedDateIndex(todayDate ? newDates.indexOf(todayDate) : 0);

    const formattedDate = formatDate(new Date(currentStartDate));
    onDateSelect(formattedDate);
  };

  const selectDate = (index) => {
    setSelectedDateIndex(index);
    const selectedDate = new Date(currentStartDate);
    selectedDate.setDate(currentStartDate.getDate() + index);
    const formattedDate = formatDate(selectedDate);
    onDateSelect(formattedDate);
  };

  const moveToNextWeek = () => {
    const nextWeek = new Date(currentStartDate);
    nextWeek.setDate(currentStartDate.getDate() + 7);
    setCurrentStartDate(nextWeek);
  };

  const moveToPreviousWeek = () => {
    const previousWeek = new Date(currentStartDate);
    previousWeek.setDate(currentStartDate.getDate() - 7);
    setCurrentStartDate(previousWeek);
  };

  const isPreviousArrowVisible =
    calendarDates.length > 0 && !calendarDates[0].isToday;

  return (
    <nav className="horizontal-calendar">
      <ul className="horizontal-calendar__dates">
        {isPreviousArrowVisible && (
          <li
            className="horizontal-calendar__date horizontal-calendar__arrow horizontal-calendar__arrow--prev"
            onClick={moveToPreviousWeek}
          >
            <span className="horizontal-calendar__arrow-icon">&lt;</span>
          </li>
        )}
        {calendarDates.map((data, index) => (
          <li
            key={data.date}
            className={`horizontal-calendar__date ${
              selectedDateIndex === index ? "horizontal-calendar__date--selected" : ""
            } ${data.isWeekend ? "horizontal-calendar__date--weekend" : ""}`}
            onClick={() => selectDate(index)}
          >
            <span className="horizontal-calendar__day-of-week">
              {data.isToday ? "Сегодня" : data.day}
            </span>
            <span className="horizontal-calendar__date-of-month">
              {data.isToday ? `${data.day} ${data.date}` : data.date}
            </span>
          </li>
        ))}
        <li
          className="horizontal-calendar__date horizontal-calendar__arrow horizontal-calendar__arrow--next"
          onClick={moveToNextWeek}
        >
          <span className="horizontal-calendar__arrow-icon">&gt;</span>
        </li>
      </ul>
    </nav>
  );
};

export default HorizontalCalendar;
