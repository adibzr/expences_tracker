import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./reduxHooks";

const useRedirect = () => {
  const { guestId, token } = useAppSelector((state) => state.userAuth);
  const navigate = useNavigate();
  if (guestId && token) {
    navigate("/home");
  }
  return;
};

export default useRedirect;
