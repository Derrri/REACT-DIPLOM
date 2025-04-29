const MovieInfo = ({ filmName, selectedTime, hallName }) => (
  <div className="buying__info-description">
    <h2 className="buying__info_movie">{filmName}</h2>
    <p className="buying__info_start">
      Начало сеанса: {selectedTime?.seance_time}
    </p>
    <p className="buying__info_hall">{hallName}</p>
  </div>
);

export default MovieInfo;
