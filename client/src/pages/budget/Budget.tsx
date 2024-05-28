import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { ButtonComponentLarge } from "../../components/ButtonComponent";
import style from "./budget.module.css";

const Budget = () => {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("create");
  };
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <KeyboardArrowLeftIcon />
        may
        <KeyboardArrowRightIcon />
      </div>
      <div className={style.content}>
        You don’t have a budget. <br />
        Let’s make one so you're in control.
      </div>
      <ButtonComponentLarge text="Create a budget" onClick={handleCreate} />
    </div>
  );
};

export default Budget;
