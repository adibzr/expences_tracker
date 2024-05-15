import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useGetTransactions from "../../hooks/useGetTransactions";
import { ButtonComponentLarge } from "../ButtonComponent";
import style from "./transactionDetail.module.css";
import { deleteTrasaction } from "../../redux/slices/transactionSlice";

const TransactionDetail = () => {
  const query = useQuery().get("id");
  const navigate = useNavigate();

  const category = useAppSelector((state) => state.categories.categories);
  const transactions = useGetTransactions();
  const banks = useAppSelector((state) => state.bank.bank);

  const trans = transactions.find((exp) => exp._id === query);
  const cat = category.find((cat) => cat._id === trans?.category);
  const bank = banks.find((bank) => bank._id === trans?.paymentSource.item);
  const dispatch = useAppDispatch();

  let item: { type: string; id: string };
  if (cat && trans) {
    item = {
      type: cat.type,
      id: trans._id,
    };
  }

  const handleDelete = () => {
    dispatch(deleteTrasaction(item));
    navigate("/");
  };

  return (
    <>
      <div style={{ marginTop: "10rem" }} className={style.wrapper}>
        <button
          onClick={() => navigate("/", { replace: true })}
          className={style.arrow}
        >
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
        <div className={style.delete} onClick={handleDelete}>
          <DeleteIcon fontSize="large" />
        </div>
      </div>
    </>
  );
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default TransactionDetail;
