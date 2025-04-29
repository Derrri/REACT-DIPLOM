import React from "react";

const SaveResetButtons = ({
  onReset,
  onSave,
  isModified,
  itemClassNameReset,
  itemClassNameSave,
}) => {
  return (
    <>
      <button className={`${itemClassNameReset} button`} onClick={onReset}>
        Отмена
      </button>
      <button
        className={`${itemClassNameSave} button ${
          isModified ? "" : "button_disabled"
        }`}
        onClick={isModified ? onSave : undefined}
        disabled={!isModified}
      >
        Сохранить
      </button>
    </>
  );
};

export default SaveResetButtons;
