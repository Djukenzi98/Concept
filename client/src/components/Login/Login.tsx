import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchUser } from "../../redux/User/usersSlice";
import { motion } from "framer-motion";
import useMousePosition from "../../hooks/useMousePosition";

const TITLE: string = "CONCEPT";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.users.loggedInUser);
  const mousePosition = useMousePosition();

  const onSubmit = (userInfo: any) => {
    console.log("userInfo", userInfo);

    dispatch(fetchUser(userInfo))
      .unwrap()
      .then((res) => {
        console.log(
          "%c loggedInUser ",
          "font-size: 15px; background-color: lightblue; color: black",
          loggedInUser
        );
        console.log(
          "%c res ",
          "font-size: 15px; background-color: lightblue; color: black",
          res
        );
        navigate("/");
      })
      .catch((err) => {
        console.error("greska:", err);
      });
  };

  const onErrors = (e: any) => {
    console.log("onErrors");
    console.error(e);
  };

  return (
    <div className="login">
      <h1 className="login__concept-banner">
        {/* <span className="concept-banner__line" /> */}
        {/* <h1>{mousePosition.x}</h1> */}
        {TITLE.split("").map((letter, index) => {
          return (
            <motion.span
              initial={
                {
                  // color: "#000",
                }
              }
              // animate={{ color: "#FFF" }}
              // transition={{
              //   duration: 1,
              //   delay: 2,
              // }}
              whileHover={{
                color: "red",
              }}
              key={index}
            >
              {letter}
            </motion.span>
          );
        })}
      </h1>
      {/* <form className="login-form" onSubmit={handleSubmit(onSubmit, onErrors)}>
        <label
          onClick={() => {
            console.log(
              "%c loggedInUser ",
              "font-size: 15px; background-color: lightblue; color: black",
              loggedInUser
            );
          }}
        >
          Username:
          <input
            type="text"
            placeholder="Enter username"
            {...register("username", { required: "Username is mandatory" })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "Password is mandatory" })}
          />
        </label>
        <button>Log in</button>
      </form> */}
    </div>
  );
};

export default Login;
