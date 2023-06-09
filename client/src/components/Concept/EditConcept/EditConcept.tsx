import React from "react";
import { useForm } from "react-hook-form";
import Concept from "../../../types/Concept";
import { useAppDispatch } from "../../../redux/store";
import { updateConcept } from "../../../redux/Concept/conceptsSlice";

const EditConcept = ({ onClose, concept }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Concept>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    let editedConcept: Concept = { _id: concept._id, ...data };

    dispatch(updateConcept(editedConcept))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.log(
          "%c error ",
          "font-size: 15px; background-color: white; color: black",
          err
        );
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-concept">
        <h3>Edit concept</h3>
        <p>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            {...register("title", { value: concept.title })}
          />
        </p>
        <p>
          <label htmlFor="description"> Description:</label>
          <input
            id="description"
            type="text"
            {...register("description", { value: concept.description })}
          />
        </p>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default EditConcept;
