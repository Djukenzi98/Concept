import React, { useEffect, useState } from "react";
import ConceptList from "../Concept/ConceptList/ConceptList";
import NewConcept from "../Concept/NewConcept/NewConcept";
import { fetchConcepts } from "../../redux/Concept/conceptsSlice";
import { useAppDispatch } from "../../redux/store";
import Modal from "../Helpers/Modal/Modal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    dispatch(fetchConcepts());
  }, []);

  return (
    <>
      <h1>Home</h1>
      <ConceptList />
      <button onClick={() => setIsOpen(true)}>Add new concept</button>
      <Modal open={isOpen} onClose={closeModal}>
        <NewConcept onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Home;
