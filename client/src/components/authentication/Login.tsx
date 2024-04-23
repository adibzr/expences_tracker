import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
// import { useAppDispatch } from "../../hooks/reduxHooks";
import style from "./auth.module.css";

interface FormData {
  username: string;
  password: string;
}

export const LogIn = ({
  logInHide,
  setLoginHide,
  setRegisterHide,
}: {
  logInHide: boolean;
  setLoginHide: (arg0: boolean) => void;
  setRegisterHide: (arg0: boolean) => void;
}) => {
  //   const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailability, setUsernameAvailability] =
    useState<boolean>(false);
  // const { username } = useAppSelector((state) => state.auth);
  const validationSchema: Yup.ObjectSchema<FormData> = Yup.object().shape({
    username: Yup.string().required("Username is required"),
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
    if (target.id === "hideLogin" || target.id === "close")
      setRegisterHide(true);
  };
  const onSubmit = (data: FormData) => {
    //TODO validate username.
    //TODO validate password. If exist return false. else return token
    // username === "banned" || username === "invalid"
    //   ? setUsernameAvailability(false)
    //   : setUsernameAvailability(true);
    // if (usernameAvailability) console.log(data);
    console.log(data);
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
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    // Disables Background Scrolling whilst the Modal is open
    if (!logInHide) {
      document.body.style.overflow = "hidden";
    }
    if (isSubmitSuccessful && usernameAvailability) {
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
    usernameAvailability,
  ]);

  return logInHide ? null : (
    <div
      id="hideLogin"
      className={style.wrapper}
      onClick={(e) => handleClose(e)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <h3>LOG IN</h3>
        <button
          id="hideLogin"
          onClick={(e) => handleClose(e)}
          style={{
            position: "absolute",
            margin: "4px",
            color: "black",
            top: 0,
            right: 0,
          }}
        >
          x
        </button>
        <div className={style.inputs}>
          <div className={style.username}>
            <input
              {...register("username")}
              type="text"
              onChange={() => setUsernameAvailability(false)}
              placeholder="USERNAME"
            />
            {errors.username && <span>{errors.username.message}</span>}
            {usernameAvailability && <span>Username doesn't exist</span>}
            {/* TODO make this work with backend */}
            <button className={style.forgotCredentials}>Forgot Username</button>
          </div>
          <div className={style.username}>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
            />
            {errors.password && <span>{errors.password.message}</span>}
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

            {/* TODO make this work with backend */}
            <button className={style.forgotCredentials}>Forgot Password</button>
          </div>
          <div className="flex justify-between">
            <button
              id="hideLogin"
              onClick={() => handleRegister()}
              className="w-fit text-secondary"
            >
              CREATE ACCOUNT
            </button>
            <button
              type="submit"
              className="bg-secondary rounded-lg text-white px-8 min-h-full pt-1 pb-2 text-lg text-center hover:bg-primary-600"
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
