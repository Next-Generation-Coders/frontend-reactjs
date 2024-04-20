import React, { useRef } from "react";

export function PopUp({ children, onCancel }) {
  const popUpElt = useRef(null);
  function handleClick(e) {
    if (e.target === popUpElt.current) {
      onCancel();
    }
  }

  return (
    <div className="popupFantasy" ref={popUpElt} onClick={handleClick}>
      <div className="popupFantasy-content">{children}</div>
    </div>
  );
}
