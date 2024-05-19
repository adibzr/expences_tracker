import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ButtonComponentLarge } from "../../components/ButtonComponent";
import style from "./budget.module.css";

const Budget = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <KeyboardArrowLeftIcon />
        may
        <KeyboardArrowRightIcon />
      </div>
      <div className={style.content}>
        You don’t have a budget. <br />
        Let’s make one so you in control.
      </div>
      <ButtonComponentLarge text="Create a budget" />
    </div>
  );
};

export default Budget;
