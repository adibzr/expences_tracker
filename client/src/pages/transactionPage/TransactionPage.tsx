import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ButtonComponentLarge } from "../../components/ButtonComponent";
import { transactionType } from "../../components/Home/Home";
import Transactions from "../../components/transactions/Transactions";
import useGetCategories from "../../hooks/useGetCategories";
import useGetTransactions from "../../hooks/useGetTransactions";
import style from "./transactionPage.module.css";

const transactionPage = () => {
  const categories = useGetCategories();
  const transactions = useGetTransactions();
  const incomeActive = false;
  const [filter, setFilter] = useState({
    filter: "",
    sort: "",
    categoty: [],
  });
  let filteredTransactions: transactionType[] = [...transactions];

  if (filter.sort) {
    switch (filter.sort) {
      case "highest":
        filteredTransactions = transactions.sort((a, b) => b.amount - a.amount);
        break;
      case "lowest":
        filteredTransactions = transactions.sort((a, b) => a.amount - b.amount);
        break;
      case "newest":
        filteredTransactions = transactions.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        break;
      case "oldest":
        filteredTransactions = transactions.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        break;
    }
  }

  if (filter.filter) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const cat = categories.find((cat) => cat._id === transaction.category);
      return cat?.type === filter.filter;
    });
  }

  return (
    <div className={style.wrapper}>
      <div className={style.rightCol}>
        <div className={style.reset}>
          <h3>Filter Transaction</h3>
          <button
            onClick={() => setFilter({ filter: "", sort: "", categoty: [] })}
          >
            reset
          </button>
        </div>
        <div className={style.filter}>
          <h3>Filter By</h3>
          <button
            onClick={() => setFilter({ ...filter, filter: "income" })}
            className={incomeActive ? style.active : ""}
          >
            Income
          </button>
          <button onClick={() => setFilter({ ...filter, filter: "expense" })}>
            Expense
          </button>
          {/* <button>Transfer</button> */}
        </div>
        <div className={style.sort}>
          <h3>Sort By</h3>
          <button onClick={() => setFilter({ ...filter, sort: "highest" })}>
            Highest
          </button>
          <button onClick={() => setFilter({ ...filter, sort: "lowest" })}>
            Lowest
          </button>
          <button onClick={() => setFilter({ ...filter, sort: "newest" })}>
            Newest
          </button>
          <button onClick={() => setFilter({ ...filter, sort: "oldest" })}>
            Oldest
          </button>
        </div>

        <Stack
          className={style.category}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => null}
        >
          <Typography variant="body1">Choose Category</Typography>
          <ArrowForwardIosIcon fontSize="inherit" />
        </Stack>
        <ButtonComponentLarge text="Apply" className={style.submit} />
      </div>

      <div className={style.transactions}>
        {filteredTransactions.map((item) => {
          const category = categories.find((cat) => cat._id === item.category);
          return <Transactions transactions={item} category={category} />;
        })}
      </div>
    </div>
  );
};

export default transactionPage;
