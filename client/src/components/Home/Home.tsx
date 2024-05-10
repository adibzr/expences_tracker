import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import expenseSVG from "../../assets/expense.svg";
import incomeSVG from "../../assets/income.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getGuestBalance } from "../../redux/slices/balanceSlice";
import { Icon, getCategories } from "../../redux/slices/categoriesSlice";
import { getGuestExpense } from "../../redux/slices/expenseSlice";
import {
  getGuestincome,
  getGuestBank,
  getGuestWallet,
} from "../../redux/slices/incomeSlice";
import { registerGuest } from "../../redux/slices/userAuthSlice";
import style from "./home.module.css";

type cat = { _id: string; title: string; icon: Icon };

const Home = () => {
  useGetGuestInfo();
  const categories = useGetCategories();

  const { loading, totalExpense, expense } = useAppSelector(
    (state) => state.expense
  );
  const balance = useAppSelector((state) => state.balance.balance);
  const income = useAppSelector((state) => state.income);
  const transactions = [...income.bank, ...income.wallet, ...expense];
  transactions.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

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
                income.totalincome
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
                totalExpense
              )}
            </p>
          </div>
        </div>
      </div>
      {categories.loading && loading ? (
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
            const allCategories = [
              ...categories.fundCategories,
              ...categories.expenseCategories,
            ];
            const category = allCategories.find(
              (cat) => cat._id === item.category
            );
            const { iconTitle, itemBgColor, svg } = useGetIcon(category);
            const date = new Date(item.date);
            const iconColor = category?.icon.iconColor;

            return (
              <div
                key={item.created_at.toString()}
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
                    style={{
                      color: "var(--color-red)",
                    }}
                  >
                    ${item.amount}
                  </div>
                  <div style={{ color: "var(--color-light-200)" }}>
                    {date.toLocaleDateString()}
                  </div>
                </div>
              </div>
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
  }, [dispatch]);
  useEffect(() => {
    const expensePromise = dispatch(getGuestExpense());
    const incomeBankPromise = dispatch(getGuestBank());
    const incomeWalletPromise = dispatch(getGuestWallet());
    const incomePrimise = dispatch(getGuestincome());
    const balancePromise = dispatch(getGuestBalance());
    return () => {
      incomeWalletPromise.abort();
      incomeBankPromise.abort();
      incomePrimise.abort();
      expensePromise.abort();
      balancePromise.abort();
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
function getGuestIncome(): any {
  throw new Error("Function not implemented.");
}
