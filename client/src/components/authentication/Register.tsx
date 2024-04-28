import { MouseEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { registerUser } from "../../redux/slices/userAuthSlice";
import { ButtonComponentSmall } from "../ButtonComponent";
import style from "./auth.module.css";

export interface userData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const Register = ({
  RegisterHide,
  setRegisterHide,
  setLoginHide,
}: {
  RegisterHide: boolean;
  setLoginHide: (arg0: boolean) => void;
  setRegisterHide: (arg0: boolean) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  // const emailNotAvilable = useAppSelector((state) => state.auth.error);
  const submitionRef = useRef<null | HTMLDivElement>(null);
  const scrollToTop = () => {
    submitionRef.current?.scrollTo(0, 0);
  };

  //=========UTIL======================

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm<userData>({
    mode: "onBlur",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //=========HADLERS======================
  const handleLogin = () => {
    setRegisterHide(true);
    setLoginHide(false);
  };
  const handleClose = (
    event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLElement;
    if (target.id === "register" || target.id === "close")
      setRegisterHide(true);
  };
  const onSubmit = (data: userData) => {
    if (isSubmitSuccessful) {
      // setSuccess(true);
      reset();
    }
    dispatch(registerUser(data));
    scrollToTop();
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Disables Background Scrolling whilst the Modal is open
    if (!RegisterHide) {
      document.body.style.overflow = "hidden";
    }

    const handleEsc = (event: { key: string }) => {
      if (event.key === "Escape") {
        setRegisterHide(true);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [RegisterHide, setRegisterHide]);

  return RegisterHide ? null : (
    <div
      id="register"
      className={style.wrapper}
      onClick={(e) => handleClose(e)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <h3 className="text-secondary text-4xl pt-16">REGISTER</h3>
        <button
          id="close"
          onClick={(e) => handleClose(e)}
          className={style.closeButton}
        >
          x
        </button>
        <div className={style.inputWrapper}>
          {/* {success ? (
              <span style={{ color: "green" }}>Successfuly created user</span>
            ) : (
              <span style={{ color: "red" }}>Email already exist</span>
            )} */}

          <div className={style.fullname}>
            <input
              {...register("fullname", { required: "Name is required" })}
              type="text"
              placeholder="fullname"
            />
            {errors.fullname && <span>{errors.fullname.message}</span>}
          </div>
          <div className={style.email}>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
              })}
              type="text"
              placeholder="email"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className={style.password}>
            <input
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Password must be minimum 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="password"
            />
            {showPassword ? (
              <FaRegEye
                onClick={() => handleTogglePassword()}
                size={25}
                color="#006367"
                className={style.icon}
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => handleTogglePassword()}
                size={25}
                color="#006367"
                className={style.icon}
              />
            )}
            {<span>{errors.password?.message}</span>}
          </div>
          <div className={style.password}>
            <input
              {...register("confirmPassword", {
                required: "Must confirm password",
                validate: (fieldValue) => {
                  return (
                    fieldValue === watch("password") ||
                    "passwords does not match"
                  );
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="confirm password"
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={() => handleLogin()}
              style={{
                width: "fit-content",
                color: "var(--color-violet-500)",
              }}
            >
              log in
            </button>
            <ButtonComponentSmall
              type="submit"
              text="REGISTER"
              className={style.button}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
