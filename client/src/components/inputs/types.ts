export interface inputsDataState {
  category: string;
  date: string;
  description: string;
  amount: number;
  wallet?: string;
  bank?: string;
}

export interface walletBankInput extends inputsDataState {
  bank: string;
}

export interface inputsDataError {
  category: boolean;
  date: boolean;
  wallet: boolean;
}
