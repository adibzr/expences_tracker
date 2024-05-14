import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import useGetTransactions from "../../hooks/useGetTransactions";
import { ButtonComponentLarge } from "../ButtonComponent";
import style from "./transactionDetail.module.css";

const TransactionDetail = () => {
  const query = useQuery().get("id");
  const navigate = useNavigate();

  const category = useAppSelector((state) => state.categories.categories);
  const transactions = useGetTransactions();
  const banks = useAppSelector((state) => state.bank.bank);

  const trans = transactions.find((exp) => exp._id === query);
  const cat = category.find((cat) => cat._id === trans?.category);
  const bank = banks.find((bank) => bank._id === trans?.paymentSource.item);

  return (
    <>
      <div style={{ marginTop: "10rem" }} className={style.wrapper}>
        <button onClick={() => navigate(-1)} className={style.arrow}>
          <ArrowBackIcon />
        </button>
        <div className={style.leftCol}>
          <div className={style.info}>
            <div>
              <span>Type</span> {cat?.type}
            </div>
            <div>
              <span>Category</span> {cat?.title}
            </div>
            <div>
              <span>Wallet</span> {bank ? bank.title : "Wallet"}
            </div>
          </div>
          <div className={style.description}>
            <h3>Description</h3>
            <p>{trans?.description}</p>
          </div>
        </div>
        <div className={style.rightCol}>
          <div className={style.amount}>${trans?.amount}</div>
          <div className={style.date}>
            {dayjs(trans?.date).format("DD-MM-YYYY")}
          </div>
        </div>
      </div>
      <div className={style.buttons}>
        <ButtonComponentLarge text="Edit" />
        <DeleteIcon htmlColor="gray" />
      </div>
    </>
  );
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default TransactionDetail;
