import { Button, ButtonProps } from "@mui/material";
import style from "./button.module.css";

interface ButtonComponentProps extends ButtonProps {
  text?: string;
  handleClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}
export const ButtonComponentLarge: React.FC<ButtonComponentProps> = ({
  text = "button",
  handleClick,
  className,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={handleClick}
      className={style.buttonLarge + " " + className}
      variant="contained"
      disableElevation
      disableRipple
      disableFocusRipple
      {...props}
    >
      {text}
      {children}
    </Button>
  );
};
export const ButtonComponentSmall: React.FC<ButtonComponentProps> = ({
  text = "button",
  handleClick,
  className,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={handleClick}
      className={style.buttonSmall + " " + className}
      variant="contained"
      disableElevation
      disableRipple
      disableFocusRipple
      {...props}
    >
      {text}
      {children}
    </Button>
  );
};
