const Legend = ({ hallPriceStandard, hallPriceVIP }) => (
  <div className="buying__scheme_legend">
    <div className="buying__scheme_prices">
      <p className="buying__scheme_legend-text">
        <span className="buying__scheme_legend-chair chair_standart"></span>{" "}Свободно (<span className="price_standart">
          {hallPriceStandard}
        </span>{" "}
        руб)
      </p>
      <p className="buying__scheme_legend-text">
        <span className="buying__scheme_legend-chair chair_vip"></span>{" "}Свободно VIP (<span className="price_vip">{hallPriceVIP}</span> руб)
      </p>
    </div>
    <div className="buying__scheme_info">
      <p className="buying__scheme_legend-text">
        <span className="buying__scheme_legend-chair chair_taken"></span>{" "}Занято
      </p>
      <p className="buying__scheme_legend-text">
        <span className="buying__scheme_legend-chair chair_selected"></span>{" "}Выбрано
      </p>
    </div>
  </div>
);

export default Legend;
