import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import expenseSVG from "../../assets/expense.svg";
import incomeSVG from "../../assets/income.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useGetCategories from "../../hooks/useGetCategories";
import { getGuestExpense } from "../../redux/slices/expenseSlice";
import { getGuestIncome } from "../../redux/slices/incomeSlice";
import { getGuest, registerGuest } from "../../redux/slices/userAuthSlice";
import Transactions from "../transactionPage/transactions/Transactions";
import style from "./home.module.css";

export interface transactionType {
  _id: string;
  amount: number;
  date: Date;
  paymentSource: {
    kind: "bank" | "wallet";
    item: string;
  };
  category: string;
  description: string;
  createdAt: Date;
}

const Home = () => {
  const categories = useGetCategories();
  useGetGuestInfo();
  const expense = useAppSelector((state) => state.expense);
  const income = useAppSelector((state) => state.income);
  const transactions: transactionType[] = [
    ...income.income,
    ...expense.expense,
  ];
  transactions.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
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
      {expense.loading || income.loading ? (
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
          </div>
          <div>
            {transactions.map((item) => {
              const category = categories.find(
                (cat) => cat._id === item.category
              );
              return <Transactions transactions={item} category={category} />;
            })}
          </div>
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
    if (guestId && token) {
      const expensePromise = dispatch(getGuestExpense());
      const incomePrimise = dispatch(getGuestIncome());
      return () => {
        incomePrimise.abort();
        expensePromise.abort();
      };
    }
  }, [guestId]);
};

export default Home;
