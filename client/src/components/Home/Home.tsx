import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import expenseSVG from "../../assets/expense.svg";
import incomeSVG from "../../assets/income.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  getGuestBalance,
  getGuestExpense,
} from "../../redux/slices/financialSlice";
import { getGuestFunds } from "../../redux/slices/fundsSlice";
import { registerGuest } from "../../redux/slices/userAuthSlice";
import style from "./home.module.css";
import { getCategories } from "../../redux/slices/categoriesSlice";

const Home = () => {
  useGetGuestInfo();
  useGetCategories();

  const categories = useAppSelector((state) => state.categories);
  let iconColor;
  let itemBgColor;
  if (!categories.loading) {
    console.log("entra");
    iconColor = categories.categories[0].icon.iconColor;
    itemBgColor = useSetitemBgColor(iconColor);
    const svg = categories.categories[0].icon.data.toString("utf-8");
  }
  console.log(categories);

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
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill={iconColor}
                className={style.transactionIcon}
              >
                <path d="M25 20H7.00002H6.58002L7.38002 24C7.61055 25.1294 8.2242 26.1444 9.11711 26.8733C10.01 27.6022 11.1274 28.0002 12.28 28H19.72C20.8727 28.0002 21.99 27.6022 22.8829 26.8733C23.7758 26.1444 24.3895 25.1294 24.62 24L25.42 20H25ZM15 25C15 25.2652 14.8947 25.5196 14.7071 25.7071C14.5196 25.8946 14.2652 26 14 26C13.7348 26 13.4804 25.8946 13.2929 25.7071C13.1054 25.5196 13 25.2652 13 25V23C13 22.7348 13.1054 22.4804 13.2929 22.2929C13.4804 22.1054 13.7348 22 14 22C14.2652 22 14.5196 22.1054 14.7071 22.2929C14.8947 22.4804 15 22.7348 15 23V25ZM19 25C19 25.2652 18.8947 25.5196 18.7071 25.7071C18.5196 25.8946 18.2652 26 18 26C17.7348 26 17.4804 25.8946 17.2929 25.7071C17.1054 25.5196 17 25.2652 17 25V23C17 22.7348 17.1054 22.4804 17.2929 22.2929C17.4804 22.1054 17.7348 22 18 22C18.2652 22 18.5196 22.1054 18.7071 22.2929C18.8947 22.4804 19 22.7348 19 23V25Z" />
                <path d="M25 10H23V9C23 8.34339 22.8707 7.69321 22.6194 7.08658C22.3681 6.47995 21.9998 5.92876 21.5355 5.46447C21.0712 5.00017 20.52 4.63188 19.9134 4.3806C19.3068 4.12933 18.6566 4 18 4H14C12.6739 4 11.4021 4.52678 10.4645 5.46447C9.52678 6.40215 9 7.67392 9 9V10H7C6.20435 10 5.44129 10.3161 4.87868 10.8787C4.31607 11.4413 4 12.2044 4 13V15C4 15.7956 4.31607 16.5587 4.87868 17.1213C5.44129 17.6839 6.20435 18 7 18H25C25.7956 18 26.5587 17.6839 27.1213 17.1213C27.6839 16.5587 28 15.7956 28 15V13C28 12.2044 27.6839 11.4413 27.1213 10.8787C26.5587 10.3161 25.7956 10 25 10ZM11 9C11 8.20435 11.3161 7.44129 11.8787 6.87868C12.4413 6.31607 13.2044 6 14 6H18C18.7956 6 19.5587 6.31607 20.1213 6.87868C20.6839 7.44129 21 8.20435 21 9V10H11V9Z" />
              </svg>
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
    return;
  }, [dispatch]);
  useEffect(() => {
    const promise = dispatch(getGuestExpense());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
  useEffect(() => {
    const promise = dispatch(getGuestFunds());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
  useEffect(() => {
    const promise = dispatch(getGuestBalance());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
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

  const { categories } = useAppSelector((state) => state.categories);

  return categories;
};
export default Home;
