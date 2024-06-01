import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom";
import { cat } from "../../../redux/slices/categoriesSlice";
import { transactionType } from "../../Home/Home";
import style from "./transactions.module.css";

const Transactions = ({
  transactions,
  category,
}: {
  transactions: transactionType;
  category: cat | undefined;
}) => {
  const { iconTitle, itemBgColor, svg } = useGetIcon(category);
  const date = dayjs(transactions.date).format("MM-DD-YYYY");
  const iconColor = category?.icon.iconColor;
  const amountColor =
    category?.type === "expense"
      ? "red"
      : category?.type === "income"
      ? "green"
      : "blue";
  if (!category) return null;
  const location = useLocation();
  const url = new URL("", window.origin + location.pathname).origin;
  return (
    <Link
      to={`${url}/detail?id=${transactions._id}`}
      key={transactions._id}
      className={style.transactions}
      style={{ "--iconBgColor": `${itemBgColor}` } as React.CSSProperties}
    >
      <div className={style.transactionTitle}>
        <svg
          style={{ "--icon-color": `${iconColor}` } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <div>{iconTitle}</div>
        <div className={style.description}>{transactions.description}</div>
      </div>
      <div className={style.transactionAmount}>
        <div
          className={style.amount}
          style={
            {
              "--color-transaction": `${amountColor}`,
            } as React.CSSProperties
          }
        >
          ${transactions.amount}
        </div>
        <div style={{ color: "var(--color-light-200)" }}>{date}</div>
      </div>
    </Link>
  );
};

const useSetitemBgColor = (iconColor: string) => {
  const iconColorSplit = iconColor.split(")");
  const lighterIconColor = iconColorSplit[0] + ", 0.2)";
  return lighterIconColor;
};
const useGetIcon = (categories: cat | undefined) => {
  let itemBgColor;
  let svg = "";

  const iconTitle = categories?.title;

  if (categories) {
    const iconColor = categories.icon.iconColor;
    itemBgColor = useSetitemBgColor(iconColor);
    svg = String.fromCharCode.apply(null, categories.icon.data.data);
  }

  return { iconTitle, itemBgColor, svg };
};

export default Transactions;
