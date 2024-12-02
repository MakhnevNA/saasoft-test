import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { watch } from 'vue';
import { initialAccountValue } from '../constants.ts';
import { IAccountsFormControl } from '../types.ts';
import {
  getAllAccountFetch,
  setAllAccountFetch
} from './accountsFormControl.transport.ts';
import { parseDelimitedStringToArray } from '@/utils/parseDelimitedStringToArray.ts';

export const useAccountsFormControl = defineStore('accountsFormControl', () => {
  const accountFormControlRef = ref([]);
  const allAccount = ref<IAccountsFormControl[]>([]);
  let previousValidAccounts = JSON.parse(JSON.stringify(allAccount.value));

  const getAllAccount = () => {
    allAccount.value = getAllAccountFetch();
  };

  const addNewAccount = () => {
    const newAccount = { id: String(Date.now()), ...initialAccountValue };
    allAccount.value.push(newAccount);
  };

  const setAllAccount = (data = allAccount.value) => {
    setAllAccountFetch(data);
  };

  const deleteAccount = (id: string) => {
    allAccount.value = allAccount.value.filter((account) => account.id !== id);
  };

  const resetPassword = (account: IAccountsFormControl) => {
    if (account.type === 'LDAP') {
      account.password = null;
    }
  };

  const convertLabelToArray = (account: IAccountsFormControl, event: Event) => {
    account.label = parseDelimitedStringToArray(
      (event.target as HTMLInputElement).value
    );
  };

  const saveValidData = () => {
    const updatedAccounts = allAccount.value.map((account, index) => {
      const isValid = accountFormControlRef.value[index].valid;
      if (!isValid) {
        return previousValidAccounts[index];
      }
      return account;
    });

    previousValidAccounts = updatedAccounts;

    setAllAccount(previousValidAccounts);
  };

  const isDisableButton = computed(() =>
    accountFormControlRef.value.some((item) => !item.valid)
  );

  watch(
    () => allAccount.value.length,
    (newValue, oldValue) => {
      if (newValue < oldValue) {
        setAllAccount();
      }
    },
    { deep: true }
  );

  return {
    allAccount,
    accountFormControlRef,
    isDisableButton,
    getAllAccount,
    deleteAccount,
    addNewAccount,
    setAllAccount,
    resetPassword,
    convertLabelToArray,
    saveValidData
  };
});
