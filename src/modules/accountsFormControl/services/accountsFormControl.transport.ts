import { IAccountsFormControl } from '../types.ts';

export const getAllAccountFetch = () => {
  return localStorage.getItem('allAccount');
};

export const setAllAccountFetch = (data: IAccountsFormControl[]) => {
  localStorage.setItem('allAccount', JSON.stringify(data));
};
