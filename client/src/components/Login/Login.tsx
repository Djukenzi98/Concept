import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchUser } from "../../redux/User/usersSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.users.loggedInUser);

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
    <form className="login-form" onSubmit={handleSubmit(onSubmit, onErrors)}>
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
    </form>
  );
};

export default Login;
