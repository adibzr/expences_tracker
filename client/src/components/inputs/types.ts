export interface inputsDataState {
  category: string;
  date: string;
  description: string;
  amount: number;
  wallet?: { title: string; id: string };
  bank?: { title: string; id: string };
}

export interface inputsDataError {
  category: boolean;
  date: boolean;
  wallet: boolean;
}
