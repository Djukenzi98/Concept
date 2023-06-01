import React, { useEffect, useState } from "react";
import ConceptList from "../Concept/ConceptList/ConceptList";
import NewConcept from "../Concept/NewConcept/NewConcept";
import { fetchConcepts } from "../../redux/Concept/conceptsSlice";
import { useAppDispatch } from "../../redux/store";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConcepts());
  }, []);

  return (
    <>
      <h1>Home</h1>
      <ConceptList />
      <button onClick={() => setIsOpen(true)}>Add new concept</button>
      <NewConcept open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Home;
