import { useState } from "react";
import styles from "./monthSlider.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface props {
  currentMonthIndex: number;
  setCurrentMonthIndex: React.Dispatch<React.SetStateAction<number>>;
}
const MonthSlider = ({ currentMonthIndex, setCurrentMonthIndex }: props) => {
  const handlePrevious = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.wrapper}>
      <KeyboardArrowLeftIcon
        type="button"
        className={styles.arrow}
        onClick={handlePrevious}
      />

      <div className={styles.month}>{months[currentMonthIndex]}</div>

      <KeyboardArrowRightIcon
        type="button"
        className={styles.arrow}
        onClick={handleNext}
      />
    </div>
  );
};

export default MonthSlider;
