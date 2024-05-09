export interface inputsDataState {
  category: string;
  date: string;
  description: string;
  amount: number;
  wallet: string;
}

export interface inputsDataError {
  category: boolean;
  date: boolean;
  wallet: boolean;
}
