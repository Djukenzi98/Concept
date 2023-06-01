import React from "react";
import ConceptItem from "../ConceptItem/ConceptItem";
import Concept from "../../../types/Concept";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { deleteConcept } from "../../../redux/Concept/conceptsSlice";

const ConceptList = () => {
  const conceptList = useAppSelector((state) => state.concepts.conceptList);
  const dispatch = useAppDispatch();

  const removeConcept = (concept: Concept) => {
    dispatch(deleteConcept(concept));
  };

  return (
    <ul className="concept-list">
      {conceptList?.map((concept, index) => {
        return (
          <ConceptItem
            key={index}
            concept={concept}
            onClose={() => removeConcept(concept)}
          />
        );
      })}
    </ul>
  );
};

export default ConceptList;
