import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Modal = ({ open, children, onClose }: any) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <button id="some" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal") as Element
  );
};

export default Modal;
