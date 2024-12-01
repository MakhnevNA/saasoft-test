import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { initialAccountValue } from '../constants.ts';
import { IAccountsFormControl, isIAccountsFormControl } from '../types.ts';
import {
  getAllAccountFetch,
  setAllAccountFetch
} from './accountsFormControl.transport.ts';

export const useAccountsFormControl = defineStore('accountsFormControl', () => {
  const accountFormControlRef = ref();
  const allAccount = ref<IAccountsFormControl[]>([]);

  const getAllAccount = () => {
    const data = getAllAccountFetch();

    const parsedData = data ? (JSON.parse(data) as unknown) : [];

    allAccount.value =
      Array.isArray(parsedData) && parsedData.every(isIAccountsFormControl)
        ? parsedData
        : [];
  };

  const addNewAccount = () => {
    const newAccount = { id: String(Date.now()), ...initialAccountValue };
    allAccount.value.push(newAccount);
  };

  const setAllAccount = () => {
    setAllAccountFetch(allAccount.value);
  };

  const deleteAccount = (id: string) => {
    allAccount.value = allAccount.value.filter((account) => account.id !== id);
  };

  watch(
    () => allAccount.value.length,
    () => {
      setAllAccount();
    },
    { deep: true }
  );

  return {
    allAccount,
    accountFormControlRef,
    getAllAccount,
    deleteAccount,
    addNewAccount,
    setAllAccount
  };
});
