import { IAccountsFormControl, isIAccountsFormControl } from '../types.ts';

export const getAllAccountFetch = () => {
  const data = localStorage.getItem('allAccount');

  const parsedData = data ? (JSON.parse(data) as unknown) : [];

  return Array.isArray(parsedData) && parsedData.every(isIAccountsFormControl)
    ? parsedData
    : [];
};

export const setAllAccountFetch = (data: IAccountsFormControl[]) => {
  localStorage.setItem('allAccount', JSON.stringify(data));
};
