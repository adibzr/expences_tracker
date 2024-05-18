import { useAppSelector } from "./reduxHooks";

const useGetTransactions = () => {
  const expense = useAppSelector((state) => state.expense);
  const income = useAppSelector((state) => state.income);
  const transactions = [...income.income, ...expense.expense];
  return transactions;
};

export default useGetTransactions;
