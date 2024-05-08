import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import expenseSVG from "../../assets/expense.svg";
import incomeSVG from "../../assets/income.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getCategories } from "../../redux/slices/categoriesSlice";
import {
  getGuestBalance,
  getGuestExpense,
} from "../../redux/slices/financialSlice";
import { getGuestFunds } from "../../redux/slices/fundsSlice";
import { registerGuest } from "../../redux/slices/userAuthSlice";
import style from "./home.module.css";

const Home = () => {
  useGetGuestInfo();
  useGetCategories();

  const categories = useAppSelector((state) => state.categories);
  let iconColor;
  let itemBgColor;
  let svg = "";
  if (!categories.loading) {
    iconColor = categories.categories[0].icon.iconColor;
    itemBgColor = useSetitemBgColor(iconColor);
    svg = String.fromCharCode.apply(
      null,
      categories.categories[0].icon.data.data
    );
  }

  const { balance, loading, totalExpense } = useAppSelector(
    (state) => state.financials
  );
  const funds = useAppSelector((state) => state.funds);

  return (
    <div className={style.wrapper}>
      <div className={style.balance}>
        <h3>Account Balance</h3>
        <h1>
          $
          {loading ? (
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
              {funds.loading ? (
                <CircularProgress
                  size={28}
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                  color="inherit"
                />
              ) : (
                funds.totalFunds
              )}
            </p>
          </div>
        </div>
        <div className={style.expense}>
          <img src={expenseSVG} alt="expense SVG" />
          <div>
            <span>expense</span>

            <p>
              {funds.loading ? (
                <CircularProgress
                  size={28}
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                  color="inherit"
                />
              ) : (
                totalExpense
              )}
            </p>
          </div>
        </div>
      </div>
      {categories.loading ? (
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
            <button>View All</button>
          </div>

          <div
            className={style.transactions}
            style={{ "--iconBgColor": `${itemBgColor}` } as React.CSSProperties}
          >
            <div className={style.transactionTitle}>
              <svg dangerouslySetInnerHTML={{ __html: svg }} />
              <div>title</div>
              <div className={style.description}>description</div>
            </div>
            <div className={style.transactionAmount}>
              <div
                style={{
                  color: "var(--color-red)",
                }}
              >
                $120
              </div>
              <div style={{ color: "var(--color-light-200)" }}>1/1/1900</div>
            </div>
          </div>
        </div>
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
  }, [dispatch]);
  useEffect(() => {
    const expensePromise = dispatch(getGuestExpense());
    const fundsPromise = dispatch(getGuestFunds());
    const balancePromise = dispatch(getGuestBalance());
    return () => {
      fundsPromise.abort();
      expensePromise.abort();
      balancePromise.abort();
    };
  }, [guestId]);
};

const useSetitemBgColor = (iconColor: string) => {
  useEffect(() => {
    document.documentElement.style.setProperty("--icon-color", iconColor);
  }, [iconColor]);
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

  const { categories } = useAppSelector((state) => state.categories);

  return categories;
};
export default Home;
