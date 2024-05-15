import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import expenseSVG from "../../assets/expense.svg";
import incomeSVG from "../../assets/income.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { cat, getCategories } from "../../redux/slices/categoriesSlice";
import { getGuestExpense } from "../../redux/slices/expenseSlice";
import { getGuest, registerGuest } from "../../redux/slices/userAuthSlice";
import style from "./home.module.css";
import { getGuestIncome } from "../../redux/slices/incomeSlice";

const Home = () => {
  useGetGuestInfo();
  const categories = useGetCategories();
  const expense = useAppSelector((state) => state.expense);
  const income = useAppSelector((state) => state.income);
  const transactions = [...income.income, ...expense.expense];
  transactions.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 1;
  });
  const balance = income.totalIncome - expense.totalExpense;
  return (
    <div className={style.wrapper}>
      <div className={style.balance}>
        <h3>Account Balance</h3>
        <h1>
          $
          {expense.loading ? (
            <CircularProgress
              size={28}
              style={{
                marginTop: "10px",
                marginLeft: "10px",
              }}
              color="inherit"
            />
          ) : (
            balance
          )}
        </h1>
      </div>
      <div className={style.info}>
        <div className={style.income}>
          <img src={incomeSVG} alt="income SVG" />
          <div>
            <span>income</span>
            <p>
              {income.loading ? (
                <CircularProgress
                  size={28}
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                  color="inherit"
                />
              ) : (
                income.totalIncome
              )}
            </p>
          </div>
        </div>
        <div className={style.expense}>
          <img src={expenseSVG} alt="expense SVG" />
          <div>
            <span>expense</span>

            <p>
              {income.loading ? (
                <CircularProgress
                  size={28}
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                  color="inherit"
                />
              ) : (
                expense.totalExpense
              )}
            </p>
          </div>
        </div>
      </div>
      {categories.loading && expense.loading ? (
        <CircularProgress
          size={28}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
          }}
          color="inherit"
        />
      ) : (
        <div className={style.transactionsWrapper}>
          <div className={style.header}>
            <span>Recent Transactions</span>
            {/* <button>View All</button> */}
          </div>

          {transactions.map((item) => {
            const category = categories.categories.find(
              (cat) => cat._id === item.category
            );
            const { iconTitle, itemBgColor, svg } = useGetIcon(category);
            const date = new Date(item.date).toLocaleDateString("es-AR");
            const iconColor = category?.icon.iconColor;
            const amountColor =
              category?.type === "expense"
                ? "red"
                : category?.type === "income"
                ? "green"
                : "blue";
            if (!category) return null;
            return (
              <Link
                to={`detail?id=${item._id}`}
                key={item._id}
                className={style.transactions}
                style={
                  { "--iconBgColor": `${itemBgColor}` } as React.CSSProperties
                }
              >
                <div className={style.transactionTitle}>
                  <svg
                    style={
                      { "--icon-color": `${iconColor}` } as React.CSSProperties
                    }
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                  <div>{iconTitle}</div>
                  <div className={style.description}>{item.description}</div>
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
                    ${item.amount}
                  </div>
                  <div style={{ color: "var(--color-light-200)" }}>{date}</div>
                </div>
              </Link>
            );
          })}
        </div>

        //TODO: add a empty field message
        //   <div
        //     style={{ textAlign: "center" }}
        //     className={style.description}
        //   >
        //     No items add incomes or expeses to see them here
        //   </div>
      )}
    </div>
  );
};

const useGetGuestInfo = () => {
  const { guestId, token } = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!guestId && !token) {
      const promise = dispatch(registerGuest());
      return () => {
        promise.abort();
      };
    }
    const guestPromise = dispatch(getGuest());
    return () => {
      guestPromise.abort();
    };
  }, [dispatch]);
  useEffect(() => {
    const expensePromise = dispatch(getGuestExpense());
    const incomePrimise = dispatch(getGuestIncome());
    return () => {
      incomePrimise.abort();
      expensePromise.abort();
    };
  }, [guestId]);
};

const useSetitemBgColor = (iconColor: string) => {
  const iconColorSplit = iconColor.split(")");
  const lighterIconColor = iconColorSplit[0] + ", 0.2)";
  return lighterIconColor;
};

const useGetCategories = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getCategories());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const categories = useAppSelector((state) => state.categories);

  return categories;
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
export default Home;
