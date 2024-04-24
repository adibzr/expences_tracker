import { ButtonComponentLarge } from "../ButtonComponent";
import style from "./home.module.css";

const Home = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.balance}>
        <h3>Account Balance</h3>
        <h1>$9000</h1>
      </div>
      <div className={style.buttons}>
        <ButtonComponentLarge text="Income" />
        <ButtonComponentLarge text="Expenses" />
      </div>
      <div className={style.transactionsWrapper}>
        <span>Recent Transactions</span>
        <button>View All</button>

        <div>shopping</div>
        <div>$120</div>
        <div>shopping</div>
        <div>$120</div>
        <div>shopping</div>
        <div>$120</div>
      </div>
    </div>
  );
};

export default Home;
