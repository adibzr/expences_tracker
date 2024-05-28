import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ButtonComponentLarge } from "../../components/ButtonComponent";
import useGetCategories from "../../hooks/useGetCategories";
import useGetTransactions from "../../hooks/useGetTransactions";
import { transactionType } from "../Home/Home";
import Transactions from "../transactions/Transactions";
import style from "./transactionPage.module.css";

const transactionPage = () => {
  const categories = useGetCategories();
  const transactions = useGetTransactions();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState({
    filter: "",
    sort: "",
    category: new Set<string>(),
  });
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddCat = (event: any) => {
    const value = event.target.outerText;
    const category = filter.category;
    category.add(value);
    setFilter({ ...filter, category });
  };

  const active = {
    filter: filter.filter,
    sort: filter.sort,
  };

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

  if (filter.category.size > 0) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const cat = categories.find((cat) => cat._id === transaction.category);
      return cat ? filter.category.has(cat.title) : false;
    });
  }

  return (
    <div className={style.wrapper}>
      <div className={style.rightCol}>
        <div className={style.reset}>
          <h3>Filter Transaction</h3>
          <button
            onClick={() =>
              setFilter({ filter: "", sort: "", category: new Set() })
            }
          >
            reset
          </button>
        </div>
        <div className={style.filter}>
          <h3>Filter By</h3>
          <button
            onClick={() => setFilter({ ...filter, filter: "income" })}
            className={active.filter === "income" ? style.active : ""}
          >
            Income
          </button>
          <button
            className={active.filter === "expense" ? style.active : ""}
            onClick={() => setFilter({ ...filter, filter: "expense" })}
          >
            Expense
          </button>
          {/* <button>Transfer</button> */}
        </div>
        <div className={style.sort}>
          <h3>Sort By</h3>
          <button
            className={active.sort === "highest" ? style.active : ""}
            onClick={() => setFilter({ ...filter, sort: "highest" })}
          >
            Highest
          </button>
          <button
            className={active.sort === "lowest" ? style.active : ""}
            onClick={() => setFilter({ ...filter, sort: "lowest" })}
          >
            Lowest
          </button>
          <button
            className={active.sort === "newest" ? style.active : ""}
            onClick={() => setFilter({ ...filter, sort: "newest" })}
          >
            Newest
          </button>
          <button
            className={active.sort === "oldest" ? style.active : ""}
            onClick={() => setFilter({ ...filter, sort: "oldest" })}
          >
            Oldest
          </button>
        </div>

        <Stack
          className={style.category}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={(event) => handleClick(event)}
        >
          <Typography variant="body1">Choose Category</Typography>
          <span>{filter.category.size} selected</span>
          <ArrowForwardIosIcon fontSize="inherit" />
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {categories.map((item) => {
            return (
              <MenuItem
                key={item._id}
                value={item.title}
                onClick={(e) => handleAddCat(e)}
                selected={filter.category.has(item.title)}
              >
                {item.title}
              </MenuItem>
            );
          })}
        </Menu>
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
