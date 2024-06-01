import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonComponentLarge } from "../../../components/ButtonComponent";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useGetTransactions from "../../../hooks/useGetTransactions";
import { deleteTrasaction } from "../../../redux/slices/transactionSlice";
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
  const dispatch = useAppDispatch();

  let item: { type: string; id: string };
  if (cat && trans) {
    item = {
      type: cat.type,
      id: trans._id,
    };
  }

  const amountColor =
    cat?.type === "expense" ? "red" : cat?.type === "income" ? "green" : "blue";
  const handleDelete = () => {
    dispatch(deleteTrasaction(item));
    navigate("/");
  };

  const handleEdit = () => {
    if (cat?.type === "expense") navigate("/edit/expense/" + trans?._id);
    if (cat?.type === "income") navigate("/edit/income/" + trans?._id);
  };

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
          <div
            style={
              {
                "--color-transaction": `${amountColor}`,
              } as React.CSSProperties
            }
            className={style.amount}
          >
            ${trans?.amount}
          </div>
          <div className={style.date}>
            {dayjs(trans?.date).format("DD-MM-YYYY")}
          </div>
        </div>
      </div>
      <div className={style.buttons}>
        <ButtonComponentLarge text="Edit" handleClick={() => handleEdit()} />
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
