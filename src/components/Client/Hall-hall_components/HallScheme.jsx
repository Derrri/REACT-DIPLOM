import Chair from "./Chair";

const HallScheme = ({ hallConfigData, selectedChairs, handleChairClick }) => (
  <div className="buying__scheme_places">
    {hallConfigData &&
      hallConfigData.map((row, rowIndex) => (
        <div className="buying__scheme_row" key={rowIndex}>
          {row.map((chairType, chairIndex) => {
            const chairId = `${rowIndex}-${chairIndex}`;
            const isSelected = selectedChairs.includes(chairId);
            return (
              <Chair
                key={chairIndex}
                rowIndex={rowIndex + 1}
                chairIndex={chairIndex + 1}
                chairType={chairType}
                isSelected={isSelected}
                onClick={() =>
                  handleChairClick(rowIndex, chairIndex, chairType)
                }
              />
            );
          })}
        </div>
      ))}
  </div>
);

export default HallScheme;
