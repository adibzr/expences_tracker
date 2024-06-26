import { yupResolver } from "@hookform/resolvers/yup";
import { MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { loginUser } from "../../redux/slices/userAuthSlice";
import { ButtonComponentSmall } from "../ButtonComponent";
import style from "./auth.module.css";

interface userData {
  email: string;
  password: string;
}

export const LogIn = ({
  logInHide,
  setLoginHide,
  setRegisterHide,
}: {
  logInHide: boolean;
  setLoginHide: (logInHide: boolean) => void;
  setRegisterHide: (RegisterHide: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [emailAvailability, setEmailAvailability] = useState<boolean>(false);
  // const { email } = useAppSelector((state) => state.auth);
  const validationSchema: Yup.ObjectSchema<userData> = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Insert password"),
  });

  //=========HADLERS======================
  const handleRegister = () => {
    setRegisterHide(false);
    setLoginHide(true);
  };
  const handleClose = (
    event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLElement;
    if (target.id === "login" || target.id === "close") {
      setRegisterHide(true);
      setLoginHide(true);
      reset();
    }
  };
  const onSubmit = (data: userData) => {
    dispatch(loginUser(data));
    if (isSubmitSuccessful) {
      reset();
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  //=========UTIL======================

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<userData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Disables Background Scrolling whilst the Modal is open
    if (!logInHide) {
      document.body.style.overflow = "hidden";
    }
    if (isSubmitSuccessful && emailAvailability) {
      reset();
    }
    const handleEsc = (event: { key: string }) => {
      if (event.key === "Escape") {
        setLoginHide(true);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [
    formState,
    isSubmitSuccessful,
    logInHide,
    reset,
    setLoginHide,
    emailAvailability,
  ]);

  return logInHide ? null : (
    <div id="login" className={style.wrapper} onClick={(e) => handleClose(e)}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <h3>LOG IN</h3>
        <button
          id="close"
          onClick={(e) => handleClose(e)}
          type="button"
          className={style.closeButton}
        >
          x
        </button>
        <div className={style.inputWrapper}>
          <div className={style.email}>
            <input
              {...register("email")}
              autoFocus
              type="text"
              onChange={() => setEmailAvailability(false)}
              placeholder="Email"
            />
            {errors.email && <span>{errors.email.message}</span>}
            {emailAvailability && <span>Email doesn't exist</span>}
          </div>
          <div className={style.password}>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
            />
            {errors.password && <span>{errors.password.message}</span>}
            {showPassword ? (
              <FaRegEye
                onClick={handleTogglePassword}
                size={25}
                className={style.icon}
              />
            ) : (
              <FaRegEyeSlash
                onClick={handleTogglePassword}
                size={25}
                className={style.icon}
              />
            )}

            {/* TODO make this work with backend */}
            <button className={style.forgotCredentials}>Forgot Password</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              id="hideLogin"
              onClick={handleRegister}
              style={{ width: "fit-content", color: "var(--color-violet-500)" }}
            >
              CREATE ACCOUNT
            </button>
            <ButtonComponentSmall
              type="submit"
              text="Log In"
              className={style.button}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
