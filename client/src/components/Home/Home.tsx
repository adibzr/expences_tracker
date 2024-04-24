import expenseSVG from "../../../public/expense.svg";
import incomeSVG from "../../../public/income.svg";
import shoppingSVG from "../../../public/shopping-bag.svg";
import style from "./home.module.css";

const Home = () => {
  const transactionColor = "red";
  return (
    <div className={style.wrapper}>
      <div className={style.balance}>
        <h3>Account Balance</h3>
        <h1>$9000</h1>
      </div>
      <div className={style.info}>
        <div className={style.income}>
          <img src={incomeSVG} alt="income SVG" />
          <div>
            <span>income</span>
            <p>5000</p>
          </div>
        </div>
        <div className={style.expense}>
          <img src={expenseSVG} alt="expense SVG" />
          <div>
            <span>expense</span>
            <p>200</p>
          </div>
        </div>
      </div>
      <div className={style.transactionsWrapper}>
        <div className={style.header}>
          <span>Recent Transactions</span>
          <button>View All</button>
        </div>

        <div className={style.transactions}>
          <div className={style.transactionTitle}>
            <img src={shoppingSVG} alt="shopping icon" />
            <div>title</div>
            <div>description</div>
          </div>
          <div className={style.transactionAmount}>
            <div
              style={{
                color: `${transactionColor}`,
              }}
            >
              $120
            </div>
            <div style={{ color: "var(--color-light-200)" }}>1/1/1900</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
