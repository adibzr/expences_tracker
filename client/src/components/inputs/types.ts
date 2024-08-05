export interface inputsDataState {
  _id?: string;
  category: string;
  amount: number;
  date?: string;
  description?: string;
  bank?: string;
}

export interface inputsDataError {
  amount: boolean;
  category: boolean;
  date: boolean;
  bank: boolean;
}
