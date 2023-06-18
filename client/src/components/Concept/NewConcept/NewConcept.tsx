import React from "react";
import { useForm } from "react-hook-form";
import Concept from "../../../types/Concept";
import { useAppDispatch } from "../../../redux/store";
import { saveConcept } from "../../../redux/Concept/conceptsSlice";

const NewConcept = ({ onClose }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Concept>();

  const dispatch = useAppDispatch();

  const onSubmit = (concept: Concept) => {
    dispatch(saveConcept(concept))
      .unwrap()
      .then(() => {
        onClose();
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Create new concept</h3>
        <p>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            {...register("title", { required: "This field is mandatory" })}
          />
          {errors.title && (
            <p className="u-color-red">{errors.title.message}</p>
          )}
        </p>
        <p>
          <label htmlFor="description"> Description:</label>
          <input
            id="description"
            type="text"
            placeholder="Enter description"
            {...register("description")}
          />
        </p>
        <p>
          <label htmlFor="category"> Category:</label>
          <input
            id="category"
            type="text"
            placeholder="Enter category"
            {...register("category")}
          />
        </p>
        <button type="submit">CREATE</button>
      </form>
    </>
  );
};

export default NewConcept;
