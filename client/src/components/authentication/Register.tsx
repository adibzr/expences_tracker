import { MouseEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { registerUser } from "../../reducerSlice/auth";

export interface userData {
  users: string;
  name: string;
  lastname: string;
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
  const [success, setSuccess] = useState(false);
  //   const dispatch = useAppDispatch();
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
      users: "",
      name: "",
      lastname: "",
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
      setSuccess(true);
      reset();
    }
    // dispatch(registerUser(data));
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
      className="fixed inset-0 bg-white !z-[10000] bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      onClick={(e) => handleClose(e)}
    >
      <div
        id="modal"
        ref={submitionRef}
        className="overflow-auto no-scrollbar w-full max-w-[600px] h-full md:p-8"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative  flex flex-col justify-center items-center bg-white w-full border-2 border-black md:rounded-[20px]"
        >
          <h3 className="text-secondary text-4xl pt-16">REGISTER</h3>
          <button
            id="close"
            onClick={(e) => handleClose(e)}
            className="absolute m-4 text-secondary right-0 top-0"
          >
            x
          </button>
          <div className="flex w-full xsm:p-20 p-0 justify-center flex-col gap-16 pb-16">
            {success ? (
              <span className="text-green-600">Successfuly created user</span>
            ) : (
              <span className="text-red-500">
                {
                  // emailNotAvilable &&
                  "Email already exist"
                }
              </span>
            )}
            <div className="flex flex-col relative focus-within:after:content-['safter:absolute after: after:text-secondary after:px-2 after:ml-4 after:top-[-12px] after:bg-white">
              <input
                {...register("users", {
                  required: "Username is required",
                })}
                type="text"
                placeholder="username"
                className="w-full border border-[#C4C4C4] h-[58px] pl-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:placeholder-transparent"
              />
              {errors.users && (
                <span className="text-red-500">{errors.users.message}</span>
              )}
            </div>
            <div className="flex flex-col relative focus-within:after:content-['name'] after:absolute after: after:text-secondary after:px-2 after:ml-4 after:top-[-12px] after:bg-white">
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="name"
                className="w-full border border-[#C4C4C4] h-[58px] pl-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:placeholder-transparent"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col relative focus-within:after:content-['last_name'] after:absolute after: after:text-secondary after:px-2 after:ml-4 after:top-[-12px] after:bg-white">
              <input
                {...register("lastname", { required: "Last name is required" })}
                type="text"
                placeholder="last Name"
                className="w-full border border-[#C4C4C4] h-[58px] pl-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:placeholder-transparent"
              />
              {errors.lastname && (
                <span className="text-red-500">{errors.lastname.message}</span>
              )}
            </div>
            <div className="flex flex-col relative focus-within:after:content-['email'] after:absolute after: after:text-secondary after:px-2 after:ml-4 after:top-[-12px] after:bg-white">
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
                className="w-full border border-[#C4C4C4] h-[58px] pl-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:placeholder-transparent"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col relative focus-within:after:content-['password'] after:absolute after: after:text-secondary after:px-2 after:ml-4 after:top-[-12px] after:bg-white">
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
                className="w-full border border-[#C4C4C4] h-[58px] pl-4 box-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:placeholder-transparent"
              />
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
              {<span className="text-red-500">{errors.password?.message}</span>}
            </div>
            <div className="flex flex-col relative focus-within:after:content-['password'] after:absolute after: after:text-secondary after:px-2 after:ml-4 after:top-[-12px] after:bg-white">
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
                className="w-full border border-[#C4C4C4] h-[58px] pl-4 box-border focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary focus:placeholder-transparent"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleLogin()}
                className="w-fit text-secondary"
              >
                log in
              </button>
              <button
                type="submit"
                className="bg-secondary rounded-lg text-white px-8 min-h-full py-2 text-lg hover:bg-primary-600"
              >
                REGISTER
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
