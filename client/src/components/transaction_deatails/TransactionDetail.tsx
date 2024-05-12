import React from "react";
import { useLocation } from "react-router-dom";
import style from "./transactionDetail.module.css";
import { ButtonComponentLarge } from "../ButtonComponent";
import DeleteIcon from "@mui/icons-material/Delete";

const TransactionDetail = () => {
  const query = useQuery().get("id");

  return (
    <>
      <div style={{ marginTop: "10rem" }} className={style.wrapper}>
        <div className={style.leftCol}>
          <div className={style.info}>
            <div>
              <span>Type</span> expense
            </div>
            <div>
              <span>Category</span> shopping
            </div>
            <div>
              <span>Wallet</span> wallet
            </div>
          </div>
          <div className={style.description}>
            <h3>Description</h3>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
        </div>
        <div className={style.rightCol}>
          <div className={style.amount}>$120</div>
          <div className={style.date}>Saturday 4 June 2021</div>
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
