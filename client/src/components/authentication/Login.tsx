import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
// import { useAppDispatch } from "../../hooks/reduxHooks";

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
  const handleClose = (event: any) => {
    if (event.target.id === "hideLogin") setLoginHide(true);
  };
  const onSubmit = (data: FormData) => {
    //TODO validate username.
    //TODO validate password. If exist return false. else return token
    // username === "banned" || username === "invalid"
    //   ? setUsernameAvailability(false)
    //   : setUsernameAvailability(true);
    // if (usernameAvailability) console.log(data);
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
      className="fixed inset-0 bg-white !z-[10000] bg-opacity-50 backdrop-blur-sm flex justify-center items-center md:p-8"
      onClick={(e) => handleClose(e)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col h-full max-h-[900px] justify-center items-center bg-white w-full md:max-w-[600px] border-2 border-black md:rounded-[20px]"
      >
        <h3 className="text-secondary text-4xl py-16">LOG IN</h3>
        <button
          id="hideLogin"
          onClick={(e) => handleClose(e)}
          className="absolute m-4 text-secondary right-0 top-0"
        >
          x
        </button>
        <div className="flex w-full xsm:p-20 p-0 justify-center flex-col gap-16 pb-16">
          <div className="flex flex-col relative focus-within:after:content-['username'] after:absolute after: after:text-secondary after:px-2 after:ml-4 after:top-[-12px] after:bg-white">
            <input
              {...register("username")}
              type="text"
              onChange={() => setUsernameAvailability(false)}
              placeholder="USERNAME"
              className="w-full border border-[#C4C4C4] h-[58px] pl-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:placeholder-transparent"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            {usernameAvailability && (
              <span className="text-red-500">Username doesn't exist</span>
            )}
            {/* TODO make this work with backend */}
            <button className="w-fit ml-4 text-secondary">
              Forgot Username
            </button>
          </div>
          <div className="flex flex-col relative focus-within:after:content-['password'] after:absolute after: after:text-secondary after:px-2 after:ml-4 after:top-[-12px] after:bg-white">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              className="w-full border border-[#C4C4C4] h-[58px] pl-4 box-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:placeholder-transparent"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            {showPassword ? (
              <FaRegEye
                onClick={() => handleTogglePassword()}
                size={25}
                color="#006367"
                className="absolute right-4 top-4"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => handleTogglePassword()}
                size={25}
                color="#006367"
                className="absolute right-4 top-4"
              />
            )}

            {/* TODO make this work with backend */}
            <button className="w-fit ml-4 text-secondary">
              Forgot Password
            </button>
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
