import React, { MouseEventHandler, useState } from "react";
import Concept from "../../../types/Concept";
import EditConcept from "../EditConcept/EditConcept";
import editIcon from "../../../assets/icons/edit2.png";
import Modal from "../../Helpers/Modal/Modal";

type ConceptItemProps = {
  concept: Concept;
  onClose: MouseEventHandler;
};

const Categories = {
  Philosophy: "philosophy",
  Social: "social",
};

const ConceptItem = ({ concept, onClose }: ConceptItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const getColor = () => {
    switch (concept.category) {
      case Categories.Philosophy:
        return "burlywood";
      case Categories.Social:
        return "lavender";
      default:
        return "lemonchiffon";
    }
  };

  return (
    <li className="concept-item" style={{ backgroundColor: getColor() }}>
      {concept.title && <div>Title: {concept.title}</div>}
      {concept.description && <div>Description: {concept.description}</div>}
      {concept.example && <div>Example: {concept.example}</div>}
      {concept.category && <div>Category: {concept.category}</div>}
      <div className="concept-item__options">
        <button className="concept-item__close" onClick={onClose}>
          X
        </button>
        <button
          className="concept-item__edit"
          onClick={() => {
            console.log("edit");
            setIsOpen(true);
          }}
        >
          <img className="concept-item__edit-icon" src={editIcon} alt="dada" />
        </button>
      </div>
      <Modal open={isOpen} onClose={closeModal}>
        <EditConcept concept={concept} onClose={closeModal} />
      </Modal>
    </li>
  );
};

export default ConceptItem;
